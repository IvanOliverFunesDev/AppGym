import Routine from '../models/Routine.js';
import { errorResponse, successResponse } from '../utils/responseHelper.js';

export const createRoutineController = async (req, res) => {
  const userId = req.user.id;
  const { daysPerWeek, days } = req.body;

  try {
    const existingRoutine = await Routine.findOne({ user: userId });
    if (existingRoutine) {
      return errorResponse(res, 400, 'Ya tienes una rutina creada. No puedes crear más de una.');
    }

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

export const getRoutineController = async (req, res) => {
  const userId = req.user.id;
  try {
    const existingRoutine = await Routine.findOne({ user: userId });

    if (!existingRoutine) {
      return errorResponse(res, 400, 'No tienes una rutina creada. Create una cuenta quieras!')
    }
    return successResponse(res, 'Rutina encontrada', existingRoutine);

  } catch (error) {
    return errorResponse(res, 500, 'Error al obtener la rutina', [{ message: error.message }]);
  }
}

export const deleteRoutineController = async (req, res) => {
  const userId = req.user.id;
  const routineId = req.params.id;
  console.log(routineId);

  try {
    const routine = await Routine.findById(routineId);

    if (!routine) {
      return errorResponse(res, 404, 'La rutina no existe');
    }

    if (routine.user.toString() !== userId) {
      return errorResponse(res, 403, 'No tienes permiso para eliminar esta rutina');
    }

    await Routine.findOneAndDelete({ _id: routineId });

    return successResponse(res, 'Rutina eliminada correctamente');

  } catch (error) {
    return errorResponse(res, 500, 'Error al eliminar la rutina', [{ message: error.message }]);
  }
}