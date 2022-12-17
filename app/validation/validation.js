/*******************************************************/
// Importing Files.
/*******************************************************/
const validatingSchema = require("../utility/functions/validator")
const lodash = require("../utility/functions/lodash");

/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const joi = require('joi')
/*******************************************************/
// Declaring Variables.
/*******************************************************/
let schema;

/*******************************************************/
// Applying Validations.
/*******************************************************/
const login = (req, res, next) => {
    console.log(req.body);
    schema = joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
    })
    validatingSchema.joiValidator(req.body, schema, next)
}


const login_v2 = (req, res, next) => {
    schema = joi.object().keys({
        contactNumber: joi.string().required(),
        loginPin: joi.number().required(),
    })
    validatingSchema.joiValidator(req.body, schema, next)
}

const login_v3 = (req, res, next) => {
    schema = joi.object().keys({
        email: joi.string().email().required(),
        pin: joi.number().required(),
        // change by usman khalid
        appName: joi.string().valid("childApp", "staffApp").required()
    })
    validatingSchema.joiValidator(req.body, schema, next)
}

const setupAuthentication = (req, res, next) => {
    schema = joi.object().keys({
      pin: joi.string().required(),
      //change by usman khalid, M4
      appName: joi.string().valid("childApp", "staffApp").required()
  
    })
    validatingSchema.joiValidator(req.body, schema, next)
  }
const updateStatus = (req, res, next) => {
    schema = joi.object().keys({
        status: joi.boolean().required(),
    })
    validatingSchema.joiValidator(req.body, schema, next)
}

// Usman work for email validation
const emailValidation = (req, res, next) => {
    schema = joi.object().keys({
        email: joi.string().email().required(),
    })
    validatingSchema.joiValidator(req.body, schema, next)
}



const path = (req, res, next) => {
    console.log("WHY TF you are doing here?");
    if (!(isNaN(req.params.id))) {
        next();
    } else {
        next({
            code: 422,
            message: "VALIDATION_ERROR",
            data: "id in path should be integer."
        });
    }
}

const query = (req, res, next) => {
    if (req.query.page) {
        if (!(isNaN(req.query.page))) {
            if ((req.query.page) <= 0) {
                console.log("in the query page if greater then zero . ");
                next({
                    code: 422,
                    message: "VALIDATION_ERROR",
                    data: "page in query should be greater then zero."
                });
            }
            console.log("herE? after ALL")
        } else {
            next({
                code: 422,
                message: "VALIDATION_ERROR",
                data: "page in query should be integer."
            });
        }
    }

    if (req.query.perPage) {
        if (!(isNaN(req.query.perPage))) {
            if ((req.query.perPage) <= 0) {
                next({
                    code: 422,
                    message: "VALIDATION_ERROR",
                    data: "perPage in query should be greater then zero."
                });
            }
        } else {
            next({
                code: 422,
                message: "VALIDATION_ERROR",
                data: "id in path should be integer."
            });
        }
    }

    if (req.query.sortOrder) {
        const sortOrder = ["ASC", "DESC"];
        if (sortOrder.indexOf(req.query.sortOrder.toUpperCase()) < 0) {
            next({
                code: 422,
                message: "VALIDATION_ERROR",
                data: "sortOrder in query should be ASC or DESC."
            });
        }
    }

    if (req.query.dataType) {
        const dataType = ["list", "dropdown"];
        if (dataType.indexOf(req.query.dataType.toLowerCase()) < 0) {
            next({
                code: 422,
                message: "VALIDATION_ERROR",
                data: "dataType in query should be list or dropdown."
            });
        }
    }

    next();
}

const remove = (req, res, next) => {
    schema = joi.object().keys({
        ids: joi.array().required()
    });

    validatingSchema.joiValidator(req.body, schema, next);
}

const filterDuplicateKey = (req, res, next) => {
    const collectionName = req.arrayFiltering.collectionName;
    const key = req.arrayFiltering.validatingKey;

    const productItems = req.body[collectionName].map((item) => { return item[key] });
    const isDuplicate = productItems.some((item, id) => {
        return productItems.indexOf(item) != id
    });
    if (isDuplicate) {
        return next({
            code: 422,
            message: "VALIDATION_ERROR",
            data: "ID in the array's object is repeated."
        });
    }
    next();
}


const filterDuplicateKey_v2 = (req, res, next) => {
    const collectionName = req.arrayFiltering.collectionName;
    const key = req.arrayFiltering.validatingKey;

    const productItems = JSON.parse(req.body[collectionName]).map((item) => { return item[key] });
    const isDuplicate = productItems.some((item, id) => {
        return productItems.indexOf(item) != id
    });
    if (isDuplicate) {
        return next({
            code: 422,
            message: "VALIDATION_ERROR",
            data: "ID in the array's object is repeated."
        });
    }
    next();
}


const filterItemInArray = (req, res, next) => {
    console.log(req.body.ids);
    if (req.body.ids.length > 0) {
        const isDuplicate = lodash.unique(req.body.ids);
        if (isDuplicate) {
            return next({
                code: 422,
                message: "VALIDATION_ERROR",
                data: "ID in the array's is repeated."
            });
        }
        next();
    }
    else {
        return next({
            code: 422,
            message: "VALIDATION_ERROR",
            data: "Array is empty"
        });
    }

}


const timeFilter = (req, res, next) => {
    const { startDateTime, endDateTime } = req.query
    if (startDateTime && endDateTime) {
        return next();
    }
    next({
        code: 422,
        message: "VALIDATION_ERROR",
        data: "startDateTime or endDateTime or gardenerId in query is missing."
    });
}
module.exports = {
    login,
    login_v2,
    login_v3,
    setupAuthentication,
    updateStatus,
    emailValidation,
    path,
    query,
    remove,
    filterDuplicateKey,
    filterDuplicateKey_v2,
    filterItemInArray,
    timeFilter
}