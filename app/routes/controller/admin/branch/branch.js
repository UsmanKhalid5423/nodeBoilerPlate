/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../../../middlewares/authentication/authenticationTest") : require("../../../../middlewares/authentication/authentication")
const models = require("../../../../../database/sequelize/sequelize");
const validate = require('../../../../validation/admin/branch/branch');
const commonValidator = require('../../../../validation/validation');
const branch = require('../../../../controllers/admin/branch/branch');
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
 * It is used by admin to create a new branch
 */
/**
 * @swagger
 * /add/branch:
 *   post:   
 *     description: Used to create a new branch.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: name of the branch.
 *         in: formData
 *         required: true
 *         type: string 
 *       - name: contactNumber
 *         description: contact number of the branch.
 *         in: formData
 *         required: true
 *         type: string 
 *       - name: address
 *         description: address of the branch.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: new user is created.     
 *       208:
 *         description: user information has some redundancy.
 *       422:
 *         description: some  user information is missing.
 */
router.route('/add/branch').post(authentication(models.admin, ["*"]), uploadImage('image'), validate.addAndUpdate, branch.add);


/**
 * It is used by admin to update a branch
 */
router.route('/update/branch/:id').patch(authentication(models.admin, ["*"]), uploadImage('logo'), branch.update);

/**
 * It is used by admin to update a branch
 */
router.route('/remove/branch/:id').delete(authentication(models.admin, ["*"]), branch.remove);

/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
