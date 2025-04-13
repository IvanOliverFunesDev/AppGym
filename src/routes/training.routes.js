import { Router } from 'express';
import { authRequired } from '../middleware/verify-token.middleware.js';
import { validateSchema } from '../middleware/validator-schema.middleware.js';
import { createTrainingSchema } from '../schemas/training/create-training.js'
import { createTrainingController } from '../controllers/training.controller.js';

const router = Router();

router.post('/', authRequired, validateSchema(createTrainingSchema), createTrainingController);

export default router;
