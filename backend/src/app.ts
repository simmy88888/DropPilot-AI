import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import trendRoutes from './routes/trendRoutes.js';
import competitorRoutes from './routes/competitorRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import performanceRoutes from './routes/performanceRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/trends', trendRoutes);
app.use('/api/competitors', competitorRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/performance', performanceRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'DropPilot AI API is running' });
});

export default app;
