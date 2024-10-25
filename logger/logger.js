// const { createLogger, format, transports } = require('winston');
import { createLogger, format, transports } from 'winston';

// Define custom formats
const { combine, timestamp, printf, colorize } = format;

// Custom format for logging
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create the logger instance
const logger = createLogger({
  level: 'info', // Default log level
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
    colorize(), // Add colorization
    logFormat // Apply custom format
  ),
  transports: [
    // Log to the console
    new transports.Console(),

    // Log errors to a file
    new transports.File({ filename: 'logs/error.log', level: 'error' }),

    // Log all levels to a combined log file
    new transports.File({ filename: 'logs/combined.log' })
  ],
});

// Export the logger instance
export default logger;
