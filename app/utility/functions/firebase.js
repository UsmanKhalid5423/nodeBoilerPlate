/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
require("dotenv").config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const networkRequest = require("../calls/networkRequest");

/*******************************************************/
//  Implementing Firebase Push Notification
/*******************************************************/
const pushNotification = async (deviceToken, title, body) => {
  const headers = {
    "cache-control": "no-cache",
    Authorization: "key=" + process.env.FIREBASE_SERVER_KEY,
    "Content-Type": "application/json"
  };

  const body = {
    to: deviceToken,
    data: {
      title: title,
      body: body
    }
  };
  networkRequest.post("https://fcm.googleapis.com/fcm/send", headers, body);
};

module.exports = {
  pushNotification
};
