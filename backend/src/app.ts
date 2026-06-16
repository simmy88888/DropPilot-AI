import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import trendRoutes from './routes/trendRoutes';
import competitorRoutes from './routes/competitorRoutes';
import supplierRoutes from './routes/supplierRoutes';
import performanceRoutes from './routes/performanceRoutes';

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
