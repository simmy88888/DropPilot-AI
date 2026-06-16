"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    try {
        const performance = db_1.default.prepare(`
      SELECT 
        SUM(budget) as total_budget,
        SUM(spend) as total_spend,
        SUM(revenue) as total_revenue,
        (SUM(revenue) / SUM(spend)) as roas
      FROM ad_campaigns
    `).get();
        res.json(performance);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
exports.default = router;
