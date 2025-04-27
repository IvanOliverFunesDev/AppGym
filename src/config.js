import dotenv from 'dotenv';
dotenv.config();

const config = {
  app: {
    PORT: process.env.PORT || 3001,
  },
  database: {
    MONGO_URI: process.env.MONGO_URI,
  },
  security: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
  // email: {
  //   USER: process.env.USER,
  //   PASS: process.env.PASS
  // },
  // cloudinary: {
  //   CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  //   CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  //   CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
  // }
};

export default config;