import connectDB from '../loaders/db.js';
import expressLoader from './express.js';

async function init(app) {
  await connectDB();
  expressLoader(app);
}

export default {
  init
};