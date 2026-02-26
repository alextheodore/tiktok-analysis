import fs from 'fs';
import path from 'path';
import pool from '../config/db';
import { logger } from './logger';

import { seedAdmin } from './seeder';

const migrate = async () => {
  try {
    const migrationFile = path.join(__dirname, '../migrations/init.sql');
    const sql = fs.readFileSync(migrationFile, 'utf8');
    await pool.query(sql);
    logger.info('Database schema initialized.');
    
    // Auto-seed admin
    await seedAdmin();
  } catch (err) {
    logger.error('Failed to run migration:', err);
    // Don't exit process, just log error, maybe retry or allow partial startup
  }
};

export default migrate;
