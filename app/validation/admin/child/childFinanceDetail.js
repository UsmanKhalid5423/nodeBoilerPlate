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
const addAndUpdate = (req, res, next) => {
    schema = joi.object().keys({
        childId: joi.number().required(),
        fundedFinanceHoursPerWeek: joi.number().required(),
        selfFinanceHoursPerWeek: joi.number().required(),
        stretch: joi.boolean().required(),

    })
    validatingSchema.joiValidator(req.body, schema, next)
}

module.exports = {
    addAndUpdate
}