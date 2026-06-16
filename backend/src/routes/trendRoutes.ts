import express from 'express';
import db from '../db';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const trends = db.prepare('SELECT * FROM trends ORDER BY growth_score DESC').all();
    res.json(trends);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
