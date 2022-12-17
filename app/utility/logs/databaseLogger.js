
/*******************************************************/
// Importing Files.
/*******************************************************/
const database = require("../calls/databaseRequest");
const models = require("../../../database/sequelize/sequelize");


/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const moment = require("moment");
const geoip = require('geoip-lite');

/*******************************************************/
// Implementing DB Logs Helper/Common  Functions.
/*******************************************************/
const info = (req, res) => {
    manageLog(req, res, new models.normalLog({}));
}

const error = (req, res) => {
    manageLog(req, res, new models.errorLog({}));
}



/*******************************************************/
// Exporting Functions.
/*******************************************************/
module.exports = {
    info,
    error
}

/*******************************************************/
// Internal Functions.
/*******************************************************/

/**
 * Function: IT IS USED TO CREATE / UPDATE A RECORD.
 */
const manageLog = async (req, res, log) => {
    const { request, response, difference } = req.time;
    //     //
    //     // var ip=req.connection.remoteAddress;
    //     // console.log("here it is: ");
    // //   console.log(ip.substring(ip.lastIndexOf(':')+1,ip.length))
    //     var geo = geoip.lookup(ip.substring(ip.lastIndexOf(':')+1,ip.length));
    //     console.log(geo);

    //     //
    if (req.loginUser) {
        switch (req.loginUser.loginRole) {
            case "admin":
                log.adminId = (req.loginUser) ? req.loginUser.detail.id : null;
                break;
            case "staff":
                log.staffId = (req.loginUser) ? req.loginUser.detail.id : null;
                break;

        }
    }

    console.log(res.code, "code ->");
    const ip = req.connection.remoteAddress;
    log.url = req.protocol + '://' + req.get('host') + req.originalUrl;
    log.ip = ip.substring(ip.lastIndexOf(':') + 1, ip.length);
    log.geoLocation = geoip.lookup(ip.substring(ip.lastIndexOf(':') + 1, ip.length));
    // log.responseCode = res.code;
    log.httpMethod = String(req.method).trim().toUpperCase()
    // log.adminId = (req.loginUser) ? req.loginUser.detail.id : null;
    log.reqHeaders = JSON.stringify(req.rawHeaders);
    log.req = (String(req.method).trim().toUpperCase() === "GET") ? JSON.stringify(req.query) : JSON.stringify(req.body);
    log.res = JSON.stringify(res);
    log.requestTime = request;
    log.responseTime = response;
    log.estimatedApiResponseTimeInMs = difference;
    log.estimatedRequestSizeInByte = JSON.stringify(req.body).length;
    log.estimatedResponseSizeInByte = JSON.stringify(res).length;;
    log.createdTime = moment().unix();
    log.updatedTime = moment().unix();

    return await database.save(log);

}
