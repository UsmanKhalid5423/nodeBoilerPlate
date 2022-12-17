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
    // if ((req.multerFileUploadSuccess)) 
    schema = joi.object().keys({
        staffId: joi.number().required(),
        attendanceId: joi.number().required(),
        note: joi.string().required(),
    })
    validatingSchema.joiValidator(req.body, schema, next)
}

const update = (req, res, next) => {
    // if ((req.multerFileUploadSuccess)) {
    schema = joi.object().keys({
        staffId: joi.number().required(),
        attendanceId: joi.number().required(),
        note: joi.string().required(),
    })
    validatingSchema.joiValidator(req.body, schema, next)
}

module.exports = {
    add,
    update
}