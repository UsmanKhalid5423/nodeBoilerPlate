/*******************************************************/
// Importing Files.
/*******************************************************/
const constantEnglish = require("../utility/locals/constantEnglish");
const logger = require("../utility/logs/fileLogger");
const databaseLogger = require('../utility/logs/databaseLogger');
/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const moment = require("moment");

/*******************************************************/
// Error Middleware.
/*******************************************************/

module.exports = function (app) {
    return app.use((error, req, res, next) => {
        console.log("error");
        console.log("=======");
        console.log(error);
        let response;
        const responseMessage = constantEnglish(error.message);
        if (error.name === "MulterError") {
            response = {
                code: 422,
                status: process.env.RESPONSE_ERROR,
                message: error.message,
                data: error.message,
                // data: {
                //     name: error.name,
                //     message: error.message,
                //     code: error.code,
                //     file: error.field
                // }
            }
        }
        else {
            response = {
                code: error.code,
                status: process.env.RESPONSE_ERROR,
                message: responseMessage,
                data: error.data ? String(error.data) : null
            }
        }
        if (req.url.includes("/login")){
            if ('password' in req.body)
            req.body.password = "******";
        }
        req.time.response = moment.utc().format("YYYY-MM-DD hh:mm:ss.SSS");
        req.time.difference = moment(req.time.response) - moment(req.time.request)
        res.status(error.code).json(response);
        //databaseLogger.error(req, response);
        logger.error(req, response);
        return;
    });
};
