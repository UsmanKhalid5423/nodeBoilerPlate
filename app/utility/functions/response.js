/*******************************************************/
// Importing Files.
/*******************************************************/
const constantEnglish = require("../locals/constantEnglish");
const logger = require("../logs/fileLogger");
const databaseLogger = require("../logs/databaseLogger")
/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const moment = require('moment');
require("dotenv").config();


/*******************************************************/
// Configuration.
/*******************************************************/

moment.suppressDeprecationWarnings = true;

/*******************************************************/
// Returning Response.
/*******************************************************/
const send = (req, res, next, level, code, message, data, status) => {
  console.log("status", status);
  const responseMessage = constantEnglish(message);
  let responseStatus, currentStatus;
  if (status) {
    responseStatus = status;
  } else {
    console.log("idheR??");
    console.log(level);
    switch (level) {
      case "info":
        currentStatus = process.env.RESPONSE_SUCCESS;
        break;
      case "warning":
        currentStatus = process.env.RESPONSE_WARN
        break;
      case "error":
        currentStatus = process.env.RESPONSE_ERROR
        break;
    }
    responseStatus = currentStatus
  }
  const response = {
    code: code,
    status: responseStatus,
    message: responseMessage,
    data: data
  };
  
  req.time.response = moment.utc().format("YYYY-MM-DD hh:mm:ss.SSS");
  req.time.difference = moment(req.time.response).valueOf() - moment(req.time.request).valueOf()
  res.status(code).json(response);
  //databaseLogger.info(req, response);
  switch (level) {
    case "info":
      logger.info(req, response);
      break;
    case "warn":
      logger.warn(req, response);
      break;
    case "error":
      logger.error(req, response);
      break;
  }
  // return;
  // return next();
};

const download = (req, res, next, contentType, fileName, data) => {
  res.setHeader("Content-disposition", "attachment; filename=" + fileName);
  res.set("Content-Type", contentType);
  res.status(200).send(data);
};

const sendHTML = (html, res) => {
  res.status(200).send(html);
}

const redirect = (res, link) => {
  res.redirect(link);
}

/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
  send,
  download,
  sendHTML,
  redirect
};
