import { z } from 'zod';

export const createTrainingSchema = z.object({
  routineDayNumber: z
    .number()
    .min(1, { message: 'El día de rutina debe ser al menos 1' })
    .max(7, { message: 'No puede superar los 7 días por semana' }),

  exercises: z.array(z.object({
    name: z
      .string()
      .min(2, { message: 'El nombre del ejercicio es muy corto' }),

    series: z.array(z.object({
      weight: z
        .number()
        .nonnegative({ message: 'El peso debe ser un número positivo o cero' }),

      reps: z
        .number()
        .int({ message: 'Las repeticiones deben ser un número entero' })
        .positive({ message: 'Debe haber al menos 1 repetición' }),

      rest: z
        .number()
        .nonnegative({ message: 'El descanso debe ser positivo' })
        .optional()
    })).min(1, { message: 'Debe haber al menos una serie' }),

    restBetweenExercises: z
      .number()
      .nonnegative({ message: 'El descanso entre ejercicios debe ser positivo' })
      .optional()
  })).min(1, { message: 'Debes registrar al menos un ejercicio' }),

  notes: z
    .string()
    .max(500, { message: 'Las notas no pueden superar los 500 caracteres' })
    .optional()
});
