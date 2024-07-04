const fs = require('fs');
const {join} = require('node:path');
const logger = require('../config/logger.config');
const dirPath = join(__dirname, '..','log');

const logHandler = async (req, res, next) => {
    
    try {
        // Check is log this exists
        await fs.mkdirSync(dirPath, {recursive: true});
        
        //Format the log message to be stored
        const logMessage = `${req.method} ${req.url} - ${req.ip}\n`
        
        // Log error using Winston  
        logger.info(logMessage)

        next();

    } catch (logErr) {
        console.error(`Failed to write error into ${logFile}:`, logErr);
        next(err)
    }

}   

const errorHandler = async (err, req, res, next) => {
    try {
        
        // Check is log this exists
        await fs.mkdirSync(dirPath, {recursive: true});
        
        //Format the log message to be stored
        const logMessage = `${err.message} -${req.method} ${req.url} - ${req.ip}\n`
        
        console.log(logMessage);

        // Log error using Winston  
        logger.error(logMessage)
        
        next(err);

    } catch (logErr) {
        console.error(`Failed to write error into ${logFile}:`, logErr);
        next(err)
    }
}; 
module.exports = {logHandler, errorHandler};