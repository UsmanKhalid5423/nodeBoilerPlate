/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
require("dotenv").config();
const fcm = require("fcm-node");

/*******************************************************/
// Configuring Firebase.
/*******************************************************/
const firebase = new fcm(process.env.FIREBASE_SERVER_KEY);

/*******************************************************/
// Implementing Firebase Push Notification
/*******************************************************/
module.exports = async (req, res, next) => {
  const message = {
    to: res.locals.userDeviceToken,
    data: res.locals.notificationData
  };
  await firebase.send(message);
};
