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
    required: false
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
      rest: Number
    }],
    restBetweenExercises: {
      type: Number,
      default: 0
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
