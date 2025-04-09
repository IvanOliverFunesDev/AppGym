import logger from '../utils/logger.js';

export function loggerMiddleware(req, res, next) {
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}