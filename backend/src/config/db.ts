import { Pool } from 'pg';
import { DATABASE_URL } from './env';
import { logger } from '../utils/logger';

const pool = new Pool({
  connectionString: DATABASE_URL,
});

// Debug logs
if (DATABASE_URL) {
    const safeUrl = DATABASE_URL.replace(/:([^:@]+)@/, ':****@');
    logger.info(`🔌 Attempting DB Connection to: ${safeUrl}`);
} else {
    logger.error('❌ DATABASE_URL is not defined!');
}

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
export default pool;
