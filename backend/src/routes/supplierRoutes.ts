import express from 'express';
import db from '../db';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const suppliers = db.prepare('SELECT * FROM suppliers').all();
    res.json(suppliers);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
