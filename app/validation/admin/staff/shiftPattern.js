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
      branchId: joi.number().required(),
      staffId: joi.number().required(),
      // roomId: joi.number().required(),
      patterns: joi.array().required().items(
        joi.object().keys({
          startDate: joi.number().required(),
          endDate: joi.number().required(),
          // breakDeduction: joi.number().required(),
          day: joi.string().valid("monday","tuesday","wednesday","thursday","friday").required(),
        })
      )
  })
  validatingSchema.joiValidator(req.body, schema, next)
}




module.exports = {
  addAndUpdate 
}