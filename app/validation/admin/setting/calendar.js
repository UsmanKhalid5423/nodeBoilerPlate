/*******************************************************/
// Importing Files.
/*******************************************************/
const validatingSchema = require("../../../utility/functions/validator")

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
const add = (req, res, next) => {
    // if ((req.multerFileUploadSuccess)) {
    schema = joi.object().keys({
        description: joi.string().required(),
        branchId: joi.number().required(),
        termId: joi.number().required(),
        startDate: joi.date().required(),
        endDate: joi.date().required(),
        type: joi.string().valid('bankHolidays', 'midTermHolidays', 'endTermHolidays','notEligibleForStretching').required(),
    })
    validatingSchema.joiValidator(req.body, schema, next)
}

const update = (req, res, next) => {
    schema = joi.object().keys({
        description: joi.string().required(),
        branchId: joi.number().required(),
        termId: joi.number().required(),
        startDate: joi.date().required(),
        endDate: joi.date().required(),
        type: joi.string().valid('bankHolidays', 'midTermHolidays', 'endTermHolidays','notEligibleForStretching').required(),
    })
    validatingSchema.joiValidator(req.body, schema, next)
}
module.exports = {
    add,
    update,
}