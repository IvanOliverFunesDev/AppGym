import { Router } from 'express';
import { loginSchema } from '../schemas/auth/login-auth.schema.js';
import { registerUserSchema } from '../schemas/auth/user-auth.schema.js';
import { validateSchema } from '../middleware/validator-schema.middleware.js';
import { loginController, registerUserController, verifyTokenController } from '../controllers/auth/auth.controller.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('✅ Backend funcionando correctamente!');
});

router.post('/login', validateSchema(loginSchema), loginController);
router.post('/register/user', validateSchema(registerUserSchema), registerUserController);
router.get('/verify', verifyTokenController);

export default router;


