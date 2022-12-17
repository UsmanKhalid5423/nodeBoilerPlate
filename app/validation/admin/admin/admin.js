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
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(14).required(),
    role: joi.string().valid("superAdmin", "admin").required(),
  })
  validatingSchema.joiValidator(req.body, schema, next)
}
const resendOtpCode = (req, res, next) => {
  schema = joi.object().keys({
    email: joi.string().email().required(),
  })
  validatingSchema.joiValidator(req.body, schema, next)
}

const verifyOtpCode = (req, res, next) => {
  schema = joi.object().keys({
    email: joi.string().email().required(),
    otpCode: joi.string().length(4).regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required(),
  })
  validatingSchema.joiValidator(req.body, schema, next)
}

const update = (req, res, next) => {
  schema = joi.object().keys({
    name: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    // password: joi.string().min(6).max(14).required(),
    role: joi.string().valid("superAdmin", "admin").required(),
  })
  validatingSchema.joiValidator(req.body, schema, next)
}

const updatePassword = (req, res, next) => {
  schema = joi.object().keys({
    email: joi.string().email().required(),
    newPassword: joi.string().min(6).max(14).required(),
    currentPassword: joi.string().min(6).max(14).required(),
  })
  validatingSchema.joiValidator(req.body, schema, next)
}

module.exports = {
  add,
  verifyOtpCode,
  update,
  resendOtpCode,
  updatePassword
}