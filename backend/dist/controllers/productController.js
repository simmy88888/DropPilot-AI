"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const db_1 = __importDefault(require("../db"));
const getProducts = (req, res) => {
    const { category, minPrice, maxPrice, q, limit = 10, offset = 0 } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];
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
        const products = db_1.default.prepare(query).all(...params);
        const total = db_1.default.prepare('SELECT COUNT(*) as count FROM products').get();
        res.json({
            data: products,
            pagination: {
                total: total.count,
                limit: Number(limit),
                offset: Number(offset)
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getProducts = getProducts;
const getProductById = (req, res) => {
    const { id } = req.params;
    try {
        const product = db_1.default.prepare('SELECT * FROM products WHERE id = ?').get(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getProductById = getProductById;
const createProduct = (req, res) => {
    const { name, description, category, price, cost, supplier_id, image_url } = req.body;
    try {
        const stmt = db_1.default.prepare(`
      INSERT INTO products (name, description, category, price, cost, supplier_id, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
        const result = stmt.run(name, description, category, price, cost, supplier_id, image_url);
        res.status(201).json({ id: result.lastInsertRowid, ...req.body });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.createProduct = createProduct;
