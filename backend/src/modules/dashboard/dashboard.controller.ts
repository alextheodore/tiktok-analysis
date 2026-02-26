import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import * as dashboardService from './dashboard.service';
import { logger } from '../../utils/logger';

export const getOverview = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const data = await dashboardService.getOverview(userId);
        res.json(data);
    } catch (error) {
        logger.error('Dashboard overview error', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getHistory = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const { limit, offset } = req.query;
        const data = await dashboardService.getHistory(userId, Number(limit) || 10, Number(offset) || 0);
        res.json(data);
    } catch (error) {
        logger.error('Dashboard history error', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteAnalysis = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        await dashboardService.deleteAnalysisLog(Number(id), userId);
        res.json({ message: 'Analysis deleted successfully' });
    } catch (error) {
        logger.error('Delete analysis error', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getLatest = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const data = await dashboardService.getLatestAnalysis(userId);
        res.json(data);
    } catch (error) {
        logger.error('Dashboard latest error', error);
        res.status(500).json({ message: 'Server error' });
    }
};
