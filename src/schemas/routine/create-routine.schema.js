import { z } from 'zod';

export const createRoutineSchema = z.object({
  daysPerWeek: z.number()
    .min(1, { message: 'Debes entrenar al menos 1 día por semana' })
    .max(7, { message: 'No puedes entrenar más de 7 días por semana' }),

  days: z.array(z.object({
    dayNumber: z.number()
      .min(1, { message: 'Día mínimo es 1' })
      .max(7, { message: 'Día máximo es 7' }),

    name: z.string()
      .min(3, { message: 'El nombre del día debe tener al menos 3 caracteres' })
      .optional(),

    exercises: z.array(z.object({
      name: z.string()
        .min(2, { message: 'El nombre del ejercicio debe tener al menos 2 caracteres' }),

      sets: z.number()
        .min(1, { message: 'Debe tener al menos 1 serie' })
        .max(30, { message: 'No puede tener más de 30 series' })
    })).min(1, { message: 'Cada día debe tener al menos un ejercicio' })
  }))
});
