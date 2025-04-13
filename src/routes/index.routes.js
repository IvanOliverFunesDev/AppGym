import { Router } from 'express';
import authRoutes from './auth.routes.js';
import Routine from './routines.routes.js';
import Training from './training.routes.js';

const router = Router();
router.use('/auth', authRoutes);
router.use('/routines', Routine);
router.use('/trainings', Training);

export default router;