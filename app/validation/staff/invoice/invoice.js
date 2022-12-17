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
    invoiceDate: joi.date().required(),
    dueDate: joi.date().required(),
    branchId: joi.number().required(),
    childIds: joi.array().min(1).unique().required(),
    timeZone: joi.string().required(),
  })

  validatingSchema.joiValidator(req.body, schema, next)


}

const update = (req, res, next) => {
  schema = joi.object().keys({
    memo: joi.string().required(),
    amount: joi.number().required(),
    //date: joi.date().required(), // changes by usman khalid
    branchId: joi.number().required(),
    startDate: joi.date().required(),
    endDate: joi.date().required(),
  })

  validatingSchema.joiValidator(req.body, schema, next)


}

const generateCSV = (req, res, next) => {
  schema = joi.object().keys({
    invoiceIds: joi.array().required(),
    timeZone: joi.string().required(),
  })

  validatingSchema.joiValidator(req.body, schema, next)


}


module.exports = {
  add,
  generateCSV
}