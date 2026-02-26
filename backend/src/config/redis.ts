import { createClient } from 'redis';
import { REDIS_URL } from './env';
import { logger } from '../utils/logger';

const redisClient = createClient({
    url: REDIS_URL
});

redisClient.on('error', (err: any) => logger.error('Redis Client Error', err));

(async () => {
    try {
        await redisClient.connect();
        logger.info('Redis connected successfully');
    } catch (error) {
        logger.error('Redis connection failed', error);
    }
})();

export default redisClient;
