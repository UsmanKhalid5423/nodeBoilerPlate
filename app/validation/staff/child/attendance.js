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
    childId: joi.number().required(),
    branchId: joi.number().required(),
    roomId: joi.number().required(),
    //sessionId: joi.number().required(),
    // timeIn: joi.number().required(),
    attendance: joi.string().valid("present", "absent").required(),
    note: joi.string().optional(),
  })
  validatingSchema.joiValidator(req.body, schema, next)
}

const update = (req, res, next) => {
  // if ((req.multerFileUploadSuccess)) {
  schema = joi.object().keys({
    timeOut: joi.number().required(),
    note: joi.string().optional(),
  })
  validatingSchema.joiValidator(req.body, schema, next)
}

// the should only be interger
// const removeDiscrepancy = (req, res, next) => {
//   schema = joi.object().keys({
//     attendaceIds: joi.array().items(joi.string().forbidden()).required(),
    
//   })
//   validatingSchema.joiValidator(req.body, schema, next)
// }

const removeDiscrepancy = (req, res, next) => {
  schema = joi.object().keys({
    attendaceIds: joi.array().items( 
      joi.object().keys({
        id: joi.number().required(),
        note: joi.string().required(),
    })
    ).required(),
  })
  validatingSchema.joiValidator(req.body, schema, next)
}


module.exports = {
  add,
  update,
  removeDiscrepancy
}