import Training from '../models/Training.js';
import Routine from '../models/Routine.js';
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

export const compareTrainingsController = async (req, res) => {
  const userId = req.user.id;
  const dayNumber = parseInt(req.params.routineDayNumber);

  try {
    const trainings = await Training.find({
      user: userId,
      routineDayNumber: dayNumber
    }).sort({ createdAt: 1 });

    if (trainings.length < 2) {
      return errorResponse(res, 400, 'Necesitas al menos dos entrenamientos para comparar');
    }

    const first = trainings[0];
    const last = trainings[trainings.length - 1];

    const result = [];

    for (let i = 0; i < first.exercises.length; i++) {
      const exFirst = first.exercises[i];
      const exLast = last.exercises.find(e => e.name === exFirst.name);

      if (!exLast) continue;

      const comparison = {
        name: exFirst.name,
        seriesComparison: []
      };

      for (let j = 0; j < exFirst.series.length; j++) {
        const s1 = exFirst.series[j];
        const s2 = exLast.series[j];

        if (!s2) continue;

        comparison.seriesComparison.push({
          serie: j + 1,
          weightDiff: s2.weight - s1.weight,
          repsDiff: s2.reps - s1.reps
        });
      }

      result.push(comparison);
    }

    return successResponse(res, `Comparación del Día ${dayNumber}`, result);
  } catch (error) {
    return errorResponse(res, 500, 'Error al comparar entrenamientos', [{ message: error.message }]);
  }
};

export const getNextTrainingDayController = async (req, res) => {
  const userId = req.user.id;

  try {
    const routine = await Routine.findOne({ user: userId });
    if (!routine) {
      return errorResponse(res, 404, 'No tienes una rutina creada');
    }

    const lastTraining = await Training.findOne({ user: userId })
      .sort({ createdAt: -1 });

    let nextDayNumber = 1;

    if (lastTraining) {
      const lastDay = lastTraining.routineDayNumber;
      nextDayNumber = lastDay < routine.daysPerWeek ? lastDay + 1 : 1;
    }

    const nextDay = routine.days.find(d => d.dayNumber === nextDayNumber);

    if (!nextDay) {
      return errorResponse(res, 404, `No se encontró el Día ${nextDayNumber} en tu rutina`);
    }

    return successResponse(res, `Hoy toca el Día ${nextDayNumber}: ${nextDay.name}`, {
      nextDayNumber,
      day: nextDay
    });

  } catch (error) {
    return errorResponse(res, 500, 'Error al obtener el siguiente día de entrenamiento', [{ message: error.message }]);
  }
};
