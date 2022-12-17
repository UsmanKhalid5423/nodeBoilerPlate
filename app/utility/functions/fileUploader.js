/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const aws = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();

/*******************************************************/
// Configuring AWS - S3 Bucket.
/*******************************************************/
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID
});
const s3 = new aws.S3();

/*******************************************************/
// Implementing File Uploader
/*******************************************************/
const uploader = async (fileSourcePath, remotefilePath) => {
  return await s3.putObject({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Body: fs.readFileSync(fileSourcePath),
    Key: remotefilePath
  });
};

/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
  uploader
};
