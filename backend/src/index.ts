import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from './utils/logger';
import { PORT } from './config/env';
import migrate from './utils/migrate';
import authRoutes from './modules/auth/auth.routes';
import dashboardRoutes from './modules/dashboard/dashboard.routes';
import analysisRoutes from './modules/analysis/analysis.routes';
import adminRoutes from './modules/admin/admin.routes';
import { setupWorker } from './modules/analysis/analysis.worker';

const app = express();

app.use(cors({
  origin: 'https://tiktok-analysiss.vercel.app', 
  credentials: true
}));
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(express.json());

// Run migration
migrate();
// Force restart trigger


// Start worker
setupWorker();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/admin', adminRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Force restart trigger 2


// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error('Unhandled Error', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
