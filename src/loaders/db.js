import mongoose from 'mongoose';
import config from '../config.js';
import logger from '../utils/logger.js';

const connectDB = async () => {
  try {
    await mongoose.connect(config.database.MONGO_URI);
    logger.info('🐵 Conectado a MongoDb');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;