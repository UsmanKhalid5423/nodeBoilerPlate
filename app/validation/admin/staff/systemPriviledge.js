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
const update = (req, res, next) => {
    schema = joi.object().keys({
        roleId: joi.number().required(),
        // operation: joi.string().valid("visibility", "read", "create", "update", "delete").required(),
        // action: joi.boolean().required(),
    })
    validatingSchema.joiValidator(req.body, schema, next)
}

module.exports = {
    update
}