import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { REDIS_URL } from '../../config/env';

const connection = new IORedis(REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

export const analysisQueue = new Queue('analysis', { connection: connection as any });

export const addAnalysisJob = async (userId: number, videoUrl: string) => {
  return await analysisQueue.add('analyze-video', { userId, videoUrl });
};
