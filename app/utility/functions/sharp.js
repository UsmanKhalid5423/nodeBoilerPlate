/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const sharp = require('sharp');
const fs = require('fs');

/*******************************************************/
//Lodash Functions.
/*******************************************************/
const resize = (input,output,fileName) => {
    new Promise((resolve, reject) => {
        sharp(input)
          .resize(100)
          .toBuffer()
          .then(data => {
            resolve(fs.writeFileSync(output + "/" + fileName + ".png", data)) ;
          })
          .catch(err => {
            reject(err);
          });
      });  
}


/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
    resize
};