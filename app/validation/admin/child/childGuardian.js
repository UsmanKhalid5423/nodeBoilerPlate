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
    guardianDetails: joi.array().min(1).max(2).required().items(
      joi.object().keys({
        name: joi.string().required(),
        title: joi.string().required(),
        relationToChild: joi.string().required(),
        email: joi.string().email().required(),
        //mobileNumber: joi.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required(),
        
        //mobileNumber: joi.string().regex(/^(\+\d{1,3}[- ]?)?\d{10,16}$/).required(),
        // mobileNumber: joi.string().regex(/^[\+]?(\+\d{1,3}[- ]?)?\d{10,16}$/).required(),
        // validation removed by usman khalid
        mobileNumber: joi.string().required(),


        // homeLandLineNumber: joi.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required(),
        // workTelephoneNumber: joi.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required(),
        // Made optional in M8
        //dateOfBirth: joi.date().required(),
        //nationalInsuranceNumber: joi.string().required(),
        //firstLanguage: joi.string().valid('urdu', 'english', 'arabic', 'norwegian').required(),
        // firstLanguageId:  joi.number().optional(),
        address: joi.string().required(),
        city: joi.string().required(),
        streetNumber: joi.string().required(),
        postalCode: joi.string().required(),
        latitude: joi.number().required(),
        longitude: joi.number().required(),
      })
    )
  })

  validatingSchema.joiValidator(req.body, schema, next)


}


module.exports = {
  addAndUpdate
}