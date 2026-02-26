import { Router } from 'express';
import { authenticateToken } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';
import * as adminController from './admin.controller';

const router = Router();

router.use(authenticateToken);
router.use(requireRole('ADMIN'));

router.get('/users', adminController.getUsers);
router.delete('/users/:id', adminController.deleteUser);
router.get('/stats', adminController.getStats);

export default router;
