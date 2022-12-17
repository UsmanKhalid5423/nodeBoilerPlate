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
const validate = require('../../../../validation/admin/child/child');
const commonValidator = require('../../../../validation/validation');
const child = require('../../../../controllers/admin/child/child');
/*******************************************************/
// Defining Routes.
/*******************************************************/

/**
 * It is used by admin to add a new child
 */

/**
 * @swagger
 * /add/child:
 *   post:   
 *     description: Used to create a new branch.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         description: firstName of the child.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastName
 *         description: lastName of the child.
 *         in: formData
 *         required: true
 *         type: string 
 *       - name: branchId
 *         description: branchId in which child is getting enrolled.
 *         in: formData
 *         required: true
 *         type: int
 *       - name: gender
 *         description: gender of the child.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: dateOfBirth
 *         description: dateOfBirth of the child.
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
router.route('/add/child').post(authentication(models.admin, ["*"]),validate.add, child.add);


/**
 * It is used by admin to fetch childs
 */
/**
 * @swagger
 * /api/v1/lms/admin/view/childs:
 *   GET:
 *   description: Used to create a new branch.
 *   parameters:
 *     - name: name
 *       description: name of the user.
 *       in: header
 *       required: true
 *       type: string
 *     responses:
 *       201:
 *         description: new user is created.     
 *       208:
 *         description: user information has some redundancy.
 *       422:
 *         description: some  user information is missing.
 */
router.route('/view/childs').get(authentication(models.admin, ["*"]), child.fetch);

/**
 * It is used by admin to find a  child
 */
router.route('/view/child/:id').get(authentication(models.admin, ["*"]), child.find);

/**
 * It is used by admin to update a child
 */
router.route('/update/child/:id').patch(authentication(models.admin, ["*"]), validate.update, child.update);

/**
 * It is used by admin to update status of a child
 */
router.route('/update/child-status/:id').patch(authentication(models.admin, ["*"]), commonValidator.updateStatus, child.updateStatus);

/**
 * It is used by admin to delete a child
 */
router.route('/remove/child/:id').delete(authentication(models.admin, ["*"]), commonValidator.path, child.remove);



/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;

