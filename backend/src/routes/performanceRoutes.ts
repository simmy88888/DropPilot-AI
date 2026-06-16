import express from 'express';
import db from '../db';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const performance = db.prepare(`
      SELECT 
        SUM(budget) as total_budget,
        SUM(spend) as total_spend,
        SUM(revenue) as total_revenue,
        (SUM(revenue) / SUM(spend)) as roas
      FROM ad_campaigns
    `).get();
    res.json(performance);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
