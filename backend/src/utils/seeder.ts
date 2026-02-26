import { registerUser } from '../modules/auth/auth.service';
import { logger } from './logger';

export const seedAdmin = async () => {
    try {
        // Check if admin exists logic is inside registerUser but it throws error if exists.
        // We can just try to register.
        await registerUser('admin@tiktokpro.com', 'admin123', 'ADMIN');
        logger.info('✅ Admin user seeded: admin@tiktokpro.com / admin123');
    } catch (error: any) {
        if (error.message === 'User already exists') {
            logger.info('ℹ️ Admin user already exists. Skipping seed.');
        } else {
            logger.error('❌ Failed to seed admin:', error);
        }
    }
};
