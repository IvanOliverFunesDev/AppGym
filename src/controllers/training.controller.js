import Training from '../models/Training.js';
import { successResponse, errorResponse } from '../utils/responseHelper.js';

export const createTrainingController = async (req, res) => {
  const userId = req.user.id;
  const { routineDayNumber, exercises, notes } = req.body;

  try {
    const newTraining = new Training({
      user: userId,
      routineDayNumber,
      exercises,
      notes
    });

    const savedTraining = await newTraining.save();

    return successResponse(res, 'Entrenamiento guardado correctamente', savedTraining);
  } catch (error) {
    return errorResponse(res, 500, 'Error al guardar el entrenamiento', [{ message: error.message }]);
  }
};

export const getUserTrainingsController = async (req, res) => {
  const userId = req.user.id;

  const order = req.query.order === 'asc' ? 1 : -1;

  try {
    const trainings = await Training.find({ user: userId }).sort({ createdAt: order });
    return successResponse(res, 'Historial de entrenamientos', trainings);
  } catch (error) {
    return errorResponse(res, 500, 'Error al obtener el historial', [{ message: error.message }]);
  }
}

export const getTrainingsByDayController = async (req, res) => {
  const userId = req.user.id;
  const dayNumber = parseInt(req.params.routineDayNumber);

  try {
    const trainings = await Training.find({
      user: userId,
      routineDayNumber: dayNumber
    }).sort({ createdAt: 1 });

    return successResponse(res, `Entrenamientos del Día ${dayNumber}`, trainings);
  } catch (error) {
    return errorResponse(res, 500, 'Error al obtener entrenamientos por día', [{ message: error.message }]);
  }
}