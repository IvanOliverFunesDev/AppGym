import jwt from 'jsonwebtoken';
import config from '../config.js';

const JSW_SECRET = config.security.JWT_SECRET;

export function generateAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JSW_SECRET,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}