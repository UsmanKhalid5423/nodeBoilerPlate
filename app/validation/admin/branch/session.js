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
  schema = joi.object().keys({
    name: joi.string().required(),
    branchId: joi.number().required(),
    ageGroupId: joi.number().required(),
    category: joi.string().valid('standard', 'hourly').required(),
    // startTime: joi.number().optional(),
    // endTime: joi.number().optional(),
  })
  
  validatingSchema.joiValidator(req.body, schema, next)
}

const update = (req, res, next) => {
  schema = joi.object().keys({
    name: joi.string().required(),
    branchId: joi.number().required(),
    ageGroupId: joi.number().required(),
    category: joi.string().valid('standard', 'hourly').required(),
    // startTime: joi.number().optional(),
    // endTime: joi.number().optional(),
     
  })
  validatingSchema.joiValidator(req.body, schema, next)
}

module.exports = {
  add,
  update
}