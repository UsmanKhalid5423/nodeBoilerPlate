/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const aws = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();

/*******************************************************/
// Defining Variables.
/*******************************************************/
let bucketName, accessKey, accessKeyId;

/*******************************************************/
// Selecting Env.
/*******************************************************/
switch (process.env.ENV) {
  case "development":
    accessKeyId = process.env.AWS_ACCESS_KEY_ID_DEVELOPMENT;
    accessKey = process.env.AWS_SECRET_ACCESS_KEY_DEVELOPMENT;
    bucketName = process.env.AWS_S3_BUCKET_NAME_DEVELOPMENT;
    break;
  case "staging":
    accessKeyId = process.env.AWS_ACCESS_KEY_ID_STAGING;
    accessKey = process.env.AWS_SECRET_ACCESS_KEY_STAGING;
    bucketName = process.env.AWS_S3_BUCKET_NAME_STAGING;
    break;
}


/*******************************************************/
// Configuring AWS - S3 Bucket.
/*******************************************************/
aws.config.update({
  secretAccessKey: accessKey,
  accessKeyId: accessKeyId
});
const s3 = new aws.S3();

/*******************************************************/
// Implementing File Uploader
/*******************************************************/
const uploader = async (fileSourcePath, remotefilePath) => {
  new Promise((resolve, reject) => {
    s3.putObject({
      Bucket: bucketName,
      Body: fs.readFileSync(fileSourcePath),
      Key: remotefilePath
    })
      .promise()
      .then(response => {
        console.log("HEREE", response);
        resolve("response",response);
      })
      .catch(error => {
        reject(error);
      });
  })

};

/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
  uploader
};
