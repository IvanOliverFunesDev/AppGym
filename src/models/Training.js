import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const trainingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  routine: {
    type: Schema.Types.ObjectId,
    ref: 'Routine',
    required: false // en caso de que se permita entrenos sueltos en el futuro
  },
  routineDayNumber: {
    type: Number,
    required: true
  },
  exercises: [{
    name: String,
    series: [{
      weight: Number,
      reps: Number,
      rest: Number // segundos entre series
    }],
    restBetweenExercises: {
      type: Number,
      default: 0 // segundos entre ejercicios
    }
  }],
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('Training', trainingSchema);
