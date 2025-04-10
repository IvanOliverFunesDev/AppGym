import { Router } from 'express';
import authRoutes from './auth.routes.js';
import Routine from './routines.routes.js';



const router = Router();
router.use('/auth', authRoutes);
router.use('/routines', Routine);


export default router;