/*******************************************************/
// Importing Files.
/*******************************************************/
const database = require("../../../utility/calls/databaseRequest");
const models = require("../../../../database/sequelize/sequelize");
const response = require("../../../utility/functions/response");
const pagination = require("../../../utility/functions/pagination");
const filterBy = require("../../../utility/functions/filter");
const stringFormatter = require("../../../utility/functions/stringFormatter")

/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const moment = require("moment");
const operator = require("sequelize").Op;
const sequelize = require("sequelize");
/*******************************************************/
//Main Controllers.
/*******************************************************/

/**
 * Controller: ADD A NEW RECORD.
 */
const add = async (req, res, next) => {
    try {
        const dataUniqueResult = await isUnique(req);
        if (dataUniqueResult != "REGISTRATION_NUMBER_AND_CONTACT_NUMBER_UNIQUE") {
            return response.send(req, res, next, "warning", 208, dataUniqueResult, null);
        }
        const result = await manageBranch(req, new models.branch({}));
        if (result) {
            response.send(
                req,
                res,
                next,
                "info",
                201,
                "BRANCH_ADDED",
                result
            );
        }
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        })
    }

};


/**
 * Controller: UPDATE DETAILS OF A SINGLE RECORD.
 */
const update = async (req, res, next) => {
    try {
        const branchId = req.params.id;
        const branch = await database.findById(models.branch, branchId);
        if (branch) {
            const { contactNumber } = req.body;
            if(contactNumber!=branch.contactNumber) // or can use isUniqueOnUpdate
            {
                const dataUniqueResult = await isUnique(req);
                if (dataUniqueResult != "REGISTRATION_NUMBER_AND_CONTACT_NUMBER_UNIQUE") {
                    return response.send(req, res, next, "warning", 208, dataUniqueResult, null);
                }
            }
            const result = await manageBranch(req, branch);
            if (result) {
                response.send(req, res, next, "info", 200, "BRANCH_UPDATED", result);
            }
        }
        else {
            response.send(req, res, next, "warning", 202, "DATA_NOT_AVAILABLE", null);
        }
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
}



/**
 * Controller: REMOVE A RECORD.
 */
const remove = async (req, res, next) => {
    try {
        const branchId = req.params.id;
        const branch = await database.findById(models.branch, branchId);
        if (!branch){
            return response.send(req, res, next, "warning", 202, "DATA_NOT_AVAILABLE", null);
        }
        await database.remove_v2(branch);
        return response.send(req, res, next, "info", 200, "BRANCH_REMOVED", null);

    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
}


/*******************************************************/
// Exporting Controllers.
/*******************************************************/
module.exports = {
    add,
    update,
    remove,
}

/*******************************************************/
// Internal Functions.
/*******************************************************/

/**
 * Function: IT IS USED TO CREATE / UPDATE A RECORD.
 */
const manageBranch = async (req, branch) => {
    const { name, contactNumber, address } = req.body;
    branch.name = name;
    branch.contactNumber = contactNumber
    branch.address = address;
    if (branch.createdTime) {
        
        branch.logoPath = (req.image) ? req.image.imagePath : branch.logoPath
        branch.updatedTime = moment().unix();
    } else {
        branch.logoPath = (req.file) ? req.file.filename : null
        branch.createdTime = moment().unix();
        branch.updatedTime = moment().unix();
    }
    return await database.save(branch);
}

/**
 * Function: DATE UNIQUENESS CHECK BEFORE CREATING A RECORD.
 */
const isUnique = async (req) => {
    const { contactNumber } = req.body;
    const isContactNumberUnique = await database.findBy(models.branch, { contactNumber: contactNumber });

    if (isContactNumberUnique)
        return "CONTACT_NUMBER_NOT_UNIQUE";
    else
        return "REGISTRATION_NUMBER_AND_CONTACT_NUMBER_UNIQUE";
}
/**
 * Function: DATE UNIQUENESS CHECK BEFORE UPDATING A RECORD.
 */
const isUniqueOnUpdate = async (req) => {
    const { contactNumber } = req.body;
    const isContactNumberUnique = await database.findBy(models.branch, { contactNumber: contactNumber, id: { [operator.not]: req.params.id } });

    if (isContactNumberUnique)
        return "CONTACT_NUMBER_NOT_UNIQUE";
    else
        return "REGISTRATION_NUMBER_AND_CONTACT_NUMBER_UNIQUE";
}
