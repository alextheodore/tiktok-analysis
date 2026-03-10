import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        // Allow access without token as requested, using a default guest user
        req.user = { id: 1, email: 'guest@example.com', role: 'user' };
        return next();
    }

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
            // Even if token is invalid, fallback to guest user
            req.user = { id: 1, email: 'guest@example.com', role: 'user' };
            return next();
        }
        req.user = user;
        next();
    });
};
