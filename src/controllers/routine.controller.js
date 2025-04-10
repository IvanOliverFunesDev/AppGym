import Routine from '../../models/Routine.js';
import { errorResponse, successResponse } from '../../utils/response.js';

export const createRoutineController = async (req, res) => {
  const userId = req.user.id;
  const { daysPerWeek, days } = req.body;

  try {
    // Verificar si el usuario ya tiene una rutina creada
    const existingRoutine = await Routine.findOne({ user: userId });
    if (existingRoutine) {
      return errorResponse(res, 400, 'Ya tienes una rutina creada. No puedes crear más de una.');
    }

    // Crear nueva rutina
    const newRoutine = new Routine({
      user: userId,
      daysPerWeek,
      days
    });

    const savedRoutine = await newRoutine.save();

    return successResponse(res, 'Rutina creada correctamente', savedRoutine);
  } catch (error) {
    return errorResponse(res, 500, 'Error al crear la rutina', [{ message: error.message }]);
  }
};
