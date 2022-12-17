/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
let multer = require("multer");
let mime = require("mime-types");
let fs = require("fs-extra");

/*******************************************************/
// Uploading File to Server.
/*******************************************************/
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // if (String(req.url) === "/add/admin" || req.url.includes("update/admin")) {
        //     folderName = `uploads/admin/profilePictures`;
        //     imagePath = folderName + "/" + Date.now() + "." + mime.extension(file.mimetype);
        // }
        // if (String(req.url) === "/add/branch" || req.url.includes("update/branch")) {
        //     folderName = `uploads/branch/logos`;
        //     imagePath = folderName + "/" + Date.now() + "." + mime.extension(file.mimetype);
        // }
        // if (String(req.url) === "/add/staff-member" || req.url.includes("update/staff-member")) {
        //     folderName = `uploads/staff/profilePictures`;
        //     imagePath = folderName + "/" + Date.now() + "." + mime.extension(file.mimetype);
        // }
        // if (String(req.url) === "/add/child" || req.url.includes("update/child")) {
        //     folderName = `uploads/child/pictures`;
        //     imagePath = folderName + "/" + Date.now() + "." + mime.extension(file.mimetype);
        // }
        folderName = `uploads`
        imagePath = folderName + "/" + Date.now() + "." + mime.extension(file.mimetype);
        console.log("IMAGE PATH:", imagePath);
        fs.mkdirsSync(folderName);
        cb(null, folderName);
    },

    // defining the file name.
    filename: function (req, file, cb) {
        cb(null, Date.now() + "." + mime.extension(file.mimetype));
    }
});

module.exports = function (type) {
    return multer({
        storage: storage,
        fileFilter: function (req, files, callback) {
            callback(null, true);
        },
        limits: {
            fileSize: 50 * 1024 * 1024
        }
    });
};
