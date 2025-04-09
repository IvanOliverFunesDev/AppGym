import logger from '../utils/logger.js';

export function errorHandlingMiddleware(err, req, res, next) {
  logger.error(`Error procesando ${req.method} ${req.url}: ${err.message}`, { stack: err.stack });
  res.status(500).send('Algo salió mal!');
}