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
    name: joi.string().required(),
    //contactNumber: joi.string().regex(/^[\+]?(\+\d{1,3}[- ]?)?\d{10,16}$/).required(),
    contactNumber: joi.string().required(),
    address: joi.string().min(3).max(260).required(),
  })
  validatingSchema.joiValidator(req.body, schema, next)
}


const updateDevice = (req, res, next) => {
  schema = joi.object().keys({
    deviceId: joi.string().required(),
  })
  validatingSchema.joiValidator(req.body, schema, next)
}



module.exports = {
  addAndUpdate,
  updateDevice
}