const {createLogger, format, transports} = require('winston');
const {timestamp, printf, combine} = format;
const {join} = require('path');

const logFormat = printf(({level, message, timestamp}) => `${timestamp} [${level.toUpperCase()}]: ${message}`);

const logger = createLogger({
    level: 'debug',
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.File({filename: join(__dirname,'..','log','error.log.txt'), level: 'error'}),
        new transports.File({filename: join(__dirname,'..','log','info.log.txt'), level: 'info'}),
        new transports.Console()
    ]
})

module.exports = logger;