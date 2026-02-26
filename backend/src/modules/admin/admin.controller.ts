import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { query } from '../../config/db';
import { logger } from '../../utils/logger';

export const getUsers = async (req: AuthRequest, res: Response) => {
    try {
        const result = await query('SELECT id, email, role, created_at FROM users ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        logger.error('Admin users error', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        await query('DELETE FROM users WHERE id = $1', [id]);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        logger.error('Admin delete user error', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getStats = async (req: AuthRequest, res: Response) => {
    try {
        const usersCount = await query('SELECT COUNT(*) FROM users');
        const analysisCount = await query('SELECT COUNT(*) FROM analysis_logs');
        const logsCount = await query('SELECT COUNT(*) FROM api_logs'); // Assuming table exists

        res.json({
            users: parseInt(usersCount.rows[0].count),
            analyses: parseInt(analysisCount.rows[0].count),
            logs: parseInt(logsCount.rows[0].count),
            failedScrapes: 0 // Mock
        });
    } catch (error) {
        logger.error('Admin stats error', error);
        res.status(500).json({ message: 'Server error' });
    }
};
