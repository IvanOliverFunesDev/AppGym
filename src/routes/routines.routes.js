import { Router } from 'express';
import { authRequired } from '../middleware/verify-token.middleware.js';
import { validateSchema } from '../middleware/validator-schema.middleware.js';
import { createRoutineSchema } from '../schemas/create-routine.schema.js';
import { createRoutineController } from '../controllers/routine.controller.js';

const router = Router();

router.post('/', authRequired, validateSchema(createRoutineSchema), createRoutineController);

export default router;
