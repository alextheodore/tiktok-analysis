import { registerUser } from '../modules/auth/auth.service';
import pool from '../config/db';
import { logger } from '../utils/logger';

const seed = async () => {
    try {
        logger.info('Seeding admin user...');
        await registerUser('admin@tiktokpro.com', 'admin123', 'ADMIN');
        logger.info('✅ Admin user created successfully!');
        logger.info('Email: admin@tiktokpro.com');
        logger.info('Password: admin123');
    } catch (error: any) {
        if (error.message === 'User already exists') {
            logger.info('ℹ️ Admin user already exists. Skipping creation.');
        } else {
            logger.error('❌ Failed to seed admin:', error);
        }
    } finally {
        await pool.end(); // Close connection to allow script to exit
    }
};

seed();
