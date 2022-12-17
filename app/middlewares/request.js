
/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const moment = require('moment')
const geoip = require('geoip-lite');
/*******************************************************/
// Request Middleware.
/*******************************************************/
module.exports = (app) => {
    return app.use((req, res, next) => {    
        req.time = {};
        req.time.request = moment.utc().format("YYYY-MM-DD hh:mm:ss.SSS");
        const allowedMethods = ["GET", "POST", "PATCH", "PUT", "DELETE"];
        const method = String(req.method).trim().toUpperCase();
        if (method === "OPTIONS") {
            return res.status(200).end();
        } else if (allowedMethods.toString().indexOf(method) < 0) {
            return next(404);
        }
        return next();
    });
};
