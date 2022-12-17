/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const path = require("path");
const multerS3 = require("multer-s3");
const multer = require("multer");
const mime = require("mime-types");
const fs = require("fs-extra");
const aws = require("aws-sdk");
require("dotenv").config();
/*******************************************************/
// Defining Variables.
/*******************************************************/
let folderName, imagePath, bucketName, accessKey, accessKeyId;
let bucketFolder = "";
/*******************************************************/
// Selecting Env.
/*******************************************************/
switch (process.env.ENV) {
  case "development":
    accessKeyId = process.env.AWS_ACCESS_KEY_ID_DEVELOPMENT;
    accessKey = process.env.AWS_SECRET_ACCESS_KEY_DEVELOPMENT;
    bucketName = process.env.AWS_S3_BUCKET_NAME_DEVELOPMENT;
    bucketFolder="staging/"
    break;
  case "staging":
    accessKeyId = process.env.AWS_ACCESS_KEY_ID_STAGING;
    accessKey = process.env.AWS_SECRET_ACCESS_KEY_STAGING;
    bucketName = process.env.AWS_S3_BUCKET_NAME_STAGING;
    bucketFolder="staging/"
    break;
  case "production":
    accessKeyId = process.env.AWS_ACCESS_KEY_ID_PRODUCTION;
    accessKey = process.env.AWS_SECRET_ACCESS_KEY_PRODUCTION;
    bucketName = process.env.AWS_S3_BUCKET_NAME_PRODUCTION;
    bucketFolder="production/"
    break;
}

/*******************************************************/
// Configring AWS.
/*******************************************************/
aws.config.update({
  secretAccessKey: accessKey,
  accessKeyId: accessKeyId
});
const s3 = new aws.S3();

/*******************************************************/
// Uploading File to S3 Bucket.
/*******************************************************/
let storage = multerS3({
  s3: s3,
  bucket: bucketName,
  key: async (req, file, cb) => {
    if (String(req.url) === "/add/admin" || req.url.includes("update/admin")) {
      folderName = bucketFolder+`uploads/admin/profilePictures`;
      imagePath = folderName + "/" + Date.now() + "." + mime.extension(file.mimetype);

    }
    if (String(req.url) === "/add/branch" || req.url.includes("update/branch")) {
      folderName = bucketFolder+`uploads/branch/logos`;
      imagePath = folderName + "/" + Date.now() + "." + mime.extension(file.mimetype);
    }
    if (String(req.url) === "/add/staff-member" || req.url.includes("update/staff-member")) {
      folderName = bucketFolder+`uploads/staff/profilePictures`;
      imagePath = folderName + "/" + Date.now() + "." + mime.extension(file.mimetype);
    }
    if (String(req.url) === "/add/child" || req.url.includes("update/child")) {
      folderName = bucketFolder+`uploads/child/pictures`;
      imagePath = folderName + "/" + Date.now() + "." + mime.extension(file.mimetype);
    }

    fs.mkdirsSync(folderName);
    cb(null, imagePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "." + mime.extension(file.mimetype));
  }
});

/*******************************************************/
// Exporting Multer Module.
/*******************************************************/
module.exports = type => {
  let allowed = [];
  if (type === "image") {
    allowed = [".png", ".jpeg", ".jpg"];
  }
  return multer({
    storage: storage,
    fileFilter: function (req, files, callback, next) {
      const ext = String(path.extname(files.originalname))
        .trim()
        .toLowerCase();
      if (allowed.toString().indexOf(ext) > -1) {
        req.multerFileUploadSuccess = true;
        callback(null, true);
      }
      else {
        req.multerFileUploadSuccess = false;
        callback(null, false);
      }
    },
    limits: {
      fileSize: 25 * 1024 * 1024
    }
  });
};
