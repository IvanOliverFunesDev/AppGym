import jwt from 'jsonwebtoken';
import config from '../config.js';

const JWT_SECRET = config.security.JWT_SECRET;

export function generateAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: '1d',  // Token con expiración de 1 día
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
