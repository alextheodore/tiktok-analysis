import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { addAnalysisJob } from './analysis.queue';
import { logger } from '../../utils/logger';

export const analyzeVideo = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const { url } = req.body;
        
        if (!url) {
            return res.status(400).json({ message: 'URL is required' });
        }

        const job = await addAnalysisJob(userId, url);
        res.status(202).json({ message: 'Analysis started', jobId: job.id });
    } catch (error) {
        logger.error('Analysis request error', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const analyzeHashtag = async (req: AuthRequest, res: Response) => {
    try {
        const { hashtag } = req.body;
        if (!hashtag) {
            return res.status(400).json({ message: 'Hashtag is required' });
        }

        // Deterministic Mock Data Generation for Hashtag
        // Use string characters to seed the random numbers so they are consistent for the same hashtag
        const seed = hashtag.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
        
        const totalVideos = (seed * 9371) % 10000000 + 50000; // 50k to 10m
        const totalViews = totalVideos * ((seed % 500) + 100); 
        
        // Mock growth trend
        const isTrending = seed % 2 === 0;

        res.json({
            hashtag,
            totalVideos,
            totalViews,
            isTrending,
            avgEngagement: ((seed % 15) + 3).toFixed(1) + '%'
        });

    } catch (error) {
        logger.error('Hashtag analysis error', error);
        res.status(500).json({ message: 'Server error' });
    }
};
