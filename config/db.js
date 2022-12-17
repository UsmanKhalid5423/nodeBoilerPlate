/*******************************************************/
// Importing Files.
/*******************************************************/
require("dotenv").config();

/*******************************************************/
// Configring Database.
/*******************************************************/
const config = {
  logging: false,
  timeStamp: false,
  paranoid: true,
  dialect: "mysql",
  charset: "utf8mb4",
  showErrors: true,
  minConnections: 1,
  maxConnections: 10,
  connectionRetryCount: 7,
  delayBeforeReconnect: 70000
};

/*******************************************************/
// Selecting Database.
/*******************************************************/
switch (process.env.ENV) {
  case "development":
    config.user = process.env.DATABASE_USERNAME_DEVELOPMENT;
    config.pass = process.env.DATABASE_PASSWORD_DEVELOPMENT;
    config.host = process.env.DATABASE_HOST_DEVELOPMENT;
    config.database = "lms"
    break;
}

/*******************************************************/
// Exporting Database Configration.
/*******************************************************/
module.exports = config;
