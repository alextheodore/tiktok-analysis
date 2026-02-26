import { Request, Response } from 'express';
import * as authService from './auth.service';
import { logger } from '../../utils/logger';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await authService.registerUser(email, password, role);
        res.status(201).json(user);
    } catch (error: any) {
        logger.error('Registration error', error);
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        res.status(200).json(result);
    } catch (error: any) {
        logger.error('Login error', error);
        res.status(401).json({ message: error.message });
    }
};
