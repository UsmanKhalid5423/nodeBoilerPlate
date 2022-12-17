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
    totalCapacity: joi.number().required(),
    operationalCapacity: joi.number().required(),
    // length: joi.number().required(),
    // width: joi.number().required(),
    area: joi.number().precision(2).required(),
    ageGroupId: joi.number().required(),

  })
  validatingSchema.joiValidator(req.body, schema, next)
}

const update = (req, res, next) => {
  schema = joi.object().keys({
    name: joi.string().required(),
    branchId: joi.number().required(),
    totalCapacity: joi.number().required(),
    operationalCapacity: joi.number().required(),
    // length: joi.number().required(),
    // width: joi.number().required(),
    area: joi.number().precision(2).required(),
    ageGroupId: joi.number().required(),
  })
  validatingSchema.joiValidator(req.body, schema, next)
}



module.exports = {
  add,
  update
}