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
    item: joi.string().required(),
    rate: joi.number().precision(2).required(),
    date: joi.date().required(),
    childIds: joi.array().min(1).unique().required(),

  })

  validatingSchema.joiValidator(req.body, schema, next)


}

const update = (req, res, next) => {
  schema = joi.object().keys({
    item: joi.string().required(),
    rate: joi.number().precision(2).required(),
    date: joi.date().required(),
  })

  validatingSchema.joiValidator(req.body, schema, next)


}
module.exports = {
  add,
  update
}