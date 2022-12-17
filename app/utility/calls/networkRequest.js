/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const axios = require("axios");
const request = require("request");
const convert = require('xml-js');

//*******************************************************/
//Network Requests.
/*******************************************************/
const post = async (url, headers, body) => {
  const options = {
    header: headers,
    method: "POST",
    url: url,
    body: body
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      if (body) {
        const convertedResponse = JSON.parse(convert.xml2json(body, {
          compact: true,
          spaces: 4
      })); 
        return resolve(convertedResponse);
        // return resolve(body);
      }
      return reject(error);
    });
  });
};

/*******************************************************/
// Exporting.
/*******************************************************/
module.exports = {
  post
};
