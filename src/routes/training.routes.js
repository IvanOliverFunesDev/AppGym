import { Router } from 'express';
import { authRequired } from '../middleware/verify-token.middleware.js';
import { validateSchema } from '../middleware/validator-schema.middleware.js';
import { createTrainingSchema } from '../schemas/training/create-training.js'
import { compareTrainingsController, createTrainingController, getTrainingsByDayController, getUserTrainingsController } from '../controllers/training.controller.js';

const router = Router();

router.post('/', authRequired, validateSchema(createTrainingSchema), createTrainingController);
router.get('/user', authRequired, getUserTrainingsController);
router.get('/user/day/:routineDayNumber', authRequired, getTrainingsByDayController);
router.get('/compare/:routineDayNumber', authRequired, compareTrainingsController);

export default router;
