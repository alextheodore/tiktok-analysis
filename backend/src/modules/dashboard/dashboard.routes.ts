import { Router } from 'express';
import { authenticateToken } from '../../middlewares/auth.middleware';
import * as dashboardController from './dashboard.controller';

const router = Router();

router.use(authenticateToken);

router.get('/overview', dashboardController.getOverview);
router.get('/history', dashboardController.getHistory);
router.get('/latest', dashboardController.getLatest); 
router.delete('/history/:id', dashboardController.deleteAnalysis);

export default router;
