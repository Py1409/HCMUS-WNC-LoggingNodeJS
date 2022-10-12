import {createLogger, transports, format} from 'winston';

const log = createLogger({
transports:
    new transports.File({
    filename: `logs/${new Date().toJSON().slice(0,10).replace(/-/g,'-')}.log`,
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),
});

export const logError = (err, req, res) =>{
    log.error(`Code: ${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
}

export const logInfo = (req, res) =>{
    log.info(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
}