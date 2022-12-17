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

  let {staffBankDetail, staffEmergencyDetails} = req.body;
  
  if (staffBankDetail && staffEmergencyDetails){
    const parsedStaffBankDetail = JSON.parse(req.body.staffBankDetail);
    const parsedStaffEmergencyDetails = JSON.parse(req.body.staffEmergencyDetails);
    req.body.staffBankDetail = parsedStaffBankDetail;
    req.body.staffEmergencyDetails = parsedStaffEmergencyDetails;  
    schema = joi.object().keys({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      email: joi.string().email().required(),
      // mobileNumber: joi.string().length().regex().required(),
      // telephoneNumber: joi.string().length(8).regex().required(),
      // validation removed by usman khalid
      mobileNumber: joi.string().required(),
      telephoneNumber: joi.string().required(),
      
      nationalInsuranceNumber: joi.string().length(8).regex().required(),
      gender: joi.string().valid('male', 'female', 'other').required(),
      nationality: joi.string().valid('pakistani', 'britsih', 'swedish', 'irish', 'dutch', 'norwegian', 'scotish').required(),
      sexualOrientation: joi.string().valid('normal').required(),
      // change by usman khalid, reason written in child validation
      // religion: joi.string().valid('islam', 'christianity', 'hinduism', 'sikhism', 'judaism', 'buddhism', 'noReligion', 'other').required(),
      // ethnicOrigin: joi.string().valid('asian', 'irish', 'arab', 'blackBritish', 'britishPakistani').required(),
      // firstLanguage: joi.string().valid('urdu', 'english', 'arabic', 'norwegian').required(),
      // nationalityId: joi.number().optional(),
      // religionId: joi.number().optional(),
      // ethnicOriginId: joi.number().optional(),
      // firstLanguageId: joi.number().optional(),
      // dietaryRequirement: joi.string().valid('vegetarian', 'glutenFree', 'dairyFree').required(),
      dateOfBirth: joi.date().required(),
      // carRegistrationNumber: joi.string().required(),
      city: joi.string().required(),
      postalCode: joi.string().required(),
      address: joi.string().min(3).max(60).required(),
      // latitude: joi.number().required(),
      // longitude: joi.number().required(),
  
      staffBankDetail: joi.object().required().keys({
        bankSocietyName: joi.string().required(),
        accountName: joi.string().required(),
        // accountNumber: joi.number().required(),
        // sortCode: joi.number().required(),
      }),
  
      staffEmergencyDetails: joi.array().min(1).max(2).required().items(
        joi.object().keys({
          name: joi.string().required(),
          relationToEmployee: joi.string().valid('father', 'mother', 'grandFather', 'grandMother', 'uncle', 'aunt', 'sibling','cousin','other','spouse','husband','wife').required(),
          // relationToEmployee: joi.string().valid().required(),
          // mobileNumber: joi.number().required(),
        })
      ),
  
      staffEmergencyDetails: joi.array()
        .unique('mobileNumber')
        .required(),
    })
    // req.arrayFiltering = {
    //   validatingKey: "mobileNumber",
    //   collectionName: "staffEmergencyDetails"
    // };
    validatingSchema.joiValidator(req.body, schema, next)
  }
  else{
    return next({
      "code": 422,
      "status": "ERROR",
      "message": "VALIDATION_ERROR",
      data: null
  })   
  }  


}

const update = (req, res, next) => {
  schema = joi.object().keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    mobileNumber: joi.string().length(8).regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required(),
    telephoneNumber: joi.string().length(8).regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required(),
    nationalInsuranceNumber: joi.string().length(8).regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required(),
    gender: joi.string().valid('male', 'female', 'other').required(),
    nationality: joi.string().valid('pakistani', 'britsih', 'swedish', 'irish', 'dutch', 'norwegian', 'scotish').required(),
    sexualOrientation: joi.string().valid('normal').required(),
    religion: joi.string().valid('islam', 'christianity', 'hinduism', 'sikhism', 'judaism', 'buddhism', 'noReligion', 'other').required(),
    ethnicOrigin: joi.string().valid('asian', 'irish', 'arab', 'blackBritish', 'britishPakistani').required(),
    firstLanguage: joi.string().valid('urdu', 'english', 'arabic', 'norwegian').required(),
    dietaryRequirement: joi.string().valid('vegetarian', 'glutenFree', 'dairyFree','noRequirement').required(),
    dateOfBirth: joi.number().required(),
    carRegistrationNumber: joi.string().required(),
    city: joi.string().required(),
    postalCode: joi.string().required(),
    address: joi.string().min(3).max(60).required(),
    latitude: joi.number().required(),
    longitude: joi.number().required(),

  })
  validatingSchema.joiValidator(req.body, schema, next)
}

module.exports = {
  addAndUpdate,
  // update
}