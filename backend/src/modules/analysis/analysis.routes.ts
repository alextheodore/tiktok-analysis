import { Router } from 'express';
import { authenticateToken } from '../../middlewares/auth.middleware';
import * as analysisController from './analysis.controller';

const router = Router();

router.use(authenticateToken);
router.post('/analyze', analysisController.analyzeVideo);
router.post('/hashtag', analysisController.analyzeHashtag);

export default router;
