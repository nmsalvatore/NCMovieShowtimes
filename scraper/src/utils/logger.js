import * as winston from 'winston'
import 'dotenv/config'
const { combine, timestamp, printf } = winston.format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
        }),
        logFormat
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        logFormat
        )
    }));
}

export default logger
