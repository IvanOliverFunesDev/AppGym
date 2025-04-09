import { z } from 'zod';

export const registerUserSchema = z.object({
  email: z
    .string().email({ message: 'El email no es válido' }),
  username: z
    .string().min(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' }).max(30),
  password: z
    .string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});