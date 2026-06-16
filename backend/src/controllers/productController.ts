import { Request, Response } from 'express';
import db from '../db/index.js';
import { Product } from '../models/types.js';

export const getProducts = (req: Request, res: Response) => {
  const { category, minPrice, maxPrice, q, limit = 10, offset = 0 } = req.query;

  let query = 'SELECT * FROM products WHERE 1=1';
  const params: any[] = [];

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  if (minPrice) {
    query += ' AND price >= ?';
    params.push(minPrice);
  }

  if (maxPrice) {
    query += ' AND price <= ?';
    params.push(maxPrice);
  }

  if (q) {
    query += ' AND (name LIKE ? OR description LIKE ?)';
    params.push(`%${q}%`, `%${q}%`);
  }

  query += ' LIMIT ? OFFSET ?';
  params.push(Number(limit), Number(offset));

  try {
    const products = db.prepare(query).all(...params) as Product[];
    const total = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
    
    res.json({
      data: products,
      pagination: {
        total: total.count,
        limit: Number(limit),
        offset: Number(offset)
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getProductById = (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as Product | undefined;
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createProduct = (req: Request, res: Response) => {
  const { name, description, category, price, cost, supplier_id, image_url } = req.body;

  try {
    const stmt = db.prepare(`
      INSERT INTO products (name, description, category, price, cost, supplier_id, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(name, description, category, price, cost, supplier_id, image_url);
    res.status(201).json({ id: result.lastInsertRowid, ...req.body });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
