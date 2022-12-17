/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const jwt = require("jsonwebtoken");
require("dotenv").config();

/*******************************************************/
// Implementing JWT Token.
/*******************************************************/
const generatingToken = async (payLoad, defaultExpiry, expiryTime) => {
  let expiresIn;
  if (defaultExpiry) {
    expiresIn = process.env.JWT_EXPIRY_TIME;
  } else {
    expiresIn = expiryTime;
  }
  return await jwt.sign(payLoad, process.env.JWT_SECRET_TOKEN, {
    expiresIn: expiresIn
  });
};

const verifyToken = async token => {
  try {
    let tokenResult = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    console.log("tokenResult", tokenResult);
    console.log("token", token);
    return true;
  }
  catch (error) {
    console.log("error", error);
    return false;
  }
};
module.exports = {
  generatingToken,
  verifyToken
};
