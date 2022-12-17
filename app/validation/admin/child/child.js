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
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    branchId: joi.number().required(),
    gender: joi.string().valid('male', 'female', 'other').required(),
  })

  validatingSchema.joiValidator(req.body, schema, next)


}

const update = (req, res, next) => {
  schema = joi.object().keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    // knownAs: joi.string().required(),
    branchId: joi.date().required(),
    // birthCertificateNumber: joi.string().required(),
    // changes by usman khalid, meeting end of January
    // birthCertificateNumber: joi.string().optional(),
    // passportNumber: joi.string().optional(),
    dateOfBirth: joi.date().required(),
    gender: joi.string().valid('male', 'female', 'other').required(),
    // nationality: joi.string().valid('pakistani', 'britsih', 'swedish', 'irish', 'dutch', 'norwegian', 'scotish').required(),
    // religion: joi.string().valid('islam', 'christianity', 'hinduism', 'sikhism', 'judaism', 'buddhism', 'noReligion', 'other').required(),
    // ethnicOrigin: joi.string().valid('asian', 'irish', 'arab', 'blackBritish', 'britishPakistani').required(),
    // firstLanguage: joi.string().valid('urdu', 'english', 'arabic', 'norwegian').required(),
    
    // nationality: joi.string().required(),
    //nationalityId: joi.number().optional(),
    // religion: joi.string().required(),
    //religionId: joi.number().optional(),
    // ethnicOrigin: joi.string().required(),
    //ethnicOriginId: joi.number().optional(),
    // firstLanguage: joi.string().required(),
    //firstLanguageId: joi.number().optional(),

    hasChildAttendedNurseryBefore: joi.boolean().required(),
    childSiblingAtThisNursery: joi.boolean().required(),
    // whenHasChildSiblingAtThisNursery: joi.string().valid('past', 'present').required(),
    //religiousFestivals:joi.string().required(),
    // change by usman
    //secretCode:joi.string().required(),
  
  })
  validatingSchema.joiValidator(req.body, schema, next)
}

module.exports = {
  add,
  update
}