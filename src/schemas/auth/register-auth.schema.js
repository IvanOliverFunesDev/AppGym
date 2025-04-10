import { z } from 'zod';

export const registerUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' }),

  email: z
    .string()
    .email({ message: 'El email no es válido' }),

  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
});
