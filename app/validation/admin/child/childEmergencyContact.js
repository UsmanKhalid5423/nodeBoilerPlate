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
    emergencyDetails: joi.array().min(1).max(2).required().items(
      joi.object().keys({
        name: joi.string().required(),
        relationToChild: joi.string().required(),
        // email: joi.string().email().optional(),
        //mobileNumber: joi.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required(),
        // validation removed by usman khalid
        mobileNumber: joi.string().required(),
        
        // homeLandLineNumber: joi.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required(),
        // workTelephoneNumber: joi.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required(),
        //dateOfBirth: joi.number().required(),
        
        // validation removed by usman khalid sprint M2
        // address: joi.string().required(),
        // city: joi.string().required(),
        // streetNumber: joi.string().required(),
        // postalCode: joi.string().required(),
        // latitude: joi.number().required(),
        // longitude: joi.number().required(),

        // placeOfWork: joi.string().optional(),
        authorisedToCollectTheChild: joi.boolean().required(),
      })
    )
  })

  validatingSchema.joiValidator(req.body, schema, next)


}
module.exports = {
  addAndUpdate
}