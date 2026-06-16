import express from 'express';
import db from '../db';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const competitors = db.prepare('SELECT * FROM competitors').all();
    res.json(competitors);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
