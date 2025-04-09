import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  routines: [{
    type: Schema.Types.ObjectId,
    ref: 'Routine'
  }],
  trainingHistory: [{
    type: Schema.Types.ObjectId,
    ref: 'Training'
  }]
}, {
  timestamps: true // para createdAt y updatedAt automáticos
});

export default model('User', userSchema);
