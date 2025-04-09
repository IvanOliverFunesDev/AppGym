import winston from 'winston';
import path from 'path';

// 1. Configuración general de winston y definición de niveles de log
const logger = winston.createLogger({
  level: 'info', // Nivel mínimo de log (debug, info, warn, error)
  format: winston.format.combine(
    winston.format.timestamp(), // Añade un timestamp a cada mensaje
    winston.format.errors({ stack: true }), // Incluye stack trace en caso de errores
    winston.format.json() // Formato JSON para estructurar los logs
  ),
  transports: [
    // 2. Transports: cada uno gestiona cómo y dónde se guardan los logs
    new winston.transports.Console({
      level: 'debug', // Nivel específico para consola (útil en desarrollo)
      format: winston.format.combine(
        winston.format.colorize(), // Colorea los mensajes en consola
        winston.format.simple() // Formato simplificado para mayor legibilidad
      ),
      handleExceptions: true, // Maneja excepciones en consola
    }),
    new winston.transports.File({
      filename: path.join('logs', 'errors.log'), // Archivo de logs de errores
      level: 'error', // Solo guarda logs de nivel error o superior
      handleExceptions: true, // Captura excepciones no manejadas
    }),
    new winston.transports.File({
      filename: path.join('logs', 'combined.log'), // Archivo para logs generales
      level: 'info', // Guarda desde el nivel info hacia arriba
    }),
  ],
  exitOnError: false, // No termina el proceso si hay errores
});

// 3. Stream para integrarlo con morgan
logger.stream = {
  write: (message) => {
    logger.info(message.trim()); // Limpia espacios al final de los mensajes de morgan
  },
};

export default logger;