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
    sessionId: joi.number().required(),
    effectiveFrom: joi.date().optional(),
    rates: joi.array().required().items(
      joi.object().keys({
        ageGroupId: joi.number().required(),
        // change by usman khalid, upto 2 decimal
        fullTimeRate: joi.number().precision(2).optional(),
        dailyTimeRate: joi.number().precision(2).optional(),
        hourlyTimeRate: joi.number().precision(2).optional(),

        // fullTimeRate: joi.number().optional(),
        // dailyTimeRate: joi.number().optional(),
        // hourlyTimeRate: joi.number().optional(),
      })
    )
  })
  req.arrayFiltering = {
    validatingKey: "ageGroupId",
    collectionName: "rates"
  };
  validatingSchema.joiValidator(req.body, schema, next)
}

const update = (req, res, next) => {
  schema = joi.object().keys({
    sessionId: joi.number().required(),
    effectiveFrom: joi.date().optional(),
    rates: joi.array().required().items(
      joi.object().keys({
        ageGroupId: joi.number().required(),
        // fullTimeRate: joi.number().optional(),
        // dailyTimeRate: joi.number().optional(),
        // hourlyTimeRate: joi.number().optional(),
        
        // change by usman khalid, upto 2 decimal
        fullTimeRate: joi.number().precision(2).optional(),
        dailyTimeRate: joi.number().precision(2).optional(),
        hourlyTimeRate: joi.number().precision(2).optional(),
      })
    )
  })
  req.arrayFiltering = {
    validatingKey: "ageGroupId",
    collectionName: "rates"
  };
  validatingSchema.joiValidator(req.body, schema, next)
}

module.exports = {
  add,
  update
}