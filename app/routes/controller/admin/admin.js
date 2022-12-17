/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../../../../middlewares/authentication/authenticationTest") : require("../../../../middlewares/authentication/authentication")
const models = require("../../../../../database/sequelize/sequelize");
const validate = require('../../../../validation/admin/admin/admin');
const admin = require('../../../../controllers/admin/admin/admin');
const commonValidator = require('../../../../validation/validation');
const multer = require("../../../../middlewares/fileUploaderLocally");

/*******************************************************/
// Configuring Multer.
/*******************************************************/
const imageUploader = multer('image');
const uploadImage = function (image) {
    return imageUploader.single(image);
};
/*******************************************************/
// Defining Routes.
/*******************************************************/

/**
 * It is used by admin to adda new admin.
 */
router.route('/add/admin').post(validate.add, admin.add);
// router.route('/add/admin').post(authentication(models.admin, ["superAdmin"]), uploadImage('profilePicture'), validate.add, admin.add);

/**
 * It is used by admin to to login
 */
router.route('/login').post(commonValidator.login, admin.login);

/**
 * It is used by admin to resend code
 */
router.route('/resend/otp-code').post(validate.resendOtpCode, admin.resendOtpCode);

/**
 * It is used by admin to verify code
 */
router.route('/verify/otp-code').post(validate.verifyOtpCode, admin.verifyOtpCode);

/**
 * It is used by admin to verify code
 */
router.route('/update-password').post(validate.updatePassword, admin.updatePassword);


/**
 * It is used by admin to fetch all admins
 */
router.route('/view/admins').get(authentication(models.admin, ["superAdmin"]), admin.fetch);

/**
 * It is used by admin to find a  admin
 */
router.route('/view/admin/:id').get(authentication(models.admin, ["superAdmin", "admin"]), admin.find);

/**
 * It is used by admin to update a admin
 */
router.route('/update/admin/:id').patch(authentication(models.admin, ["superAdmin", "admin"]), uploadImage('profilePicture'), validate.update, admin.update);

/**
 * It is used by admin to delete a admin
 */
router.route('/update/admin-status/:id').patch(authentication(models.admin, ["superAdmin"]), commonValidator.updateStatus, admin.updateStatus);

/**
 * It is used by admin to logout
 */

router.route('/logout').get(authentication(models.admin, ["*"]), admin.logout);

/**
 * It is used by admin to recover account
 */

router.route('/reset-password').post(admin.resetPassword);

/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
