import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const routineSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: 'Mi rutina'
  },
  daysPerWeek: {
    type: Number,
    required: true,
    min: 1,
    max: 7
  },
  days: [{
    dayNumber: Number,
    name: String,
    exercises: [{
      name: String,
      sets: Number // Solo número de series, sin reps ni peso
    }]
  }]
});

export default model('Routine', routineSchema);
