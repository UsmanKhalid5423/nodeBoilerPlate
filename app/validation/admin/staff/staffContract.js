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
    staffContractDetail: joi.object().required().keys({
      jobTitle: joi.string().valid('nurseryAssistantUnqualified', 'nurseryAssistantLevel2', 'nurseryPractitionerLevel3+','nurseryPractitionerLevel3+Grade-C', 'nurseryPractitionerLevel3+Grade-B', 'nurseryPractitionerLevel3+Grade-A',
      'roomLeader', 'senior', 'preSchoolDeputyManager', 'preSchoolManager', 'deputyManager', 'nurseryManager', 'seniorManager',
      'trainingManager', 'adminAssistant', 'director', 'accountsAssistant', 'iTSupportTechnician', 'cook',
      'cleaner', 'careTaker', 'maintenanceWorker','nurseryPractitionerLevel6').required(),
      branchId: joi.number().required(),
      staffId: joi.number().required(),
      payCycleId: joi.number().required(),
      paymentMode: joi.string().valid("salary", "hourly").required(),
      employmentStartDate: joi.date().required(),
      // employmentEndDate: joi.number().required(),
      contractType: joi.string().valid("termTime", "fullTime","zeroHour").required(),
      //contractHours: joi.number().required(),
      //contractWeeks: joi.number().required(),
      contractRate: joi.number().required(),
    }),
    staffProbationPeriodDetail: joi.object().required().keys({
      duration: joi.number().required(),
      startDate: joi.date().required(),
      endDate: joi.date().required(),
    })
  })
  validatingSchema.joiValidator(req.body, schema, next)
}

const update = (req, res, next) => {
  schema = joi.object().keys({staffContractDetail: joi.object().required().keys({
    jobTitle: joi.string().valid('nurseryAssistantUnqualified', 'nurseryAssistantLevel2', 'nurseryPractitionerLevel3+','nurseryPractitionerLevel3+Grade-C', 'nurseryPractitionerLevel3+Grade-B', 'nurseryPractitionerLevel3+Grade-A',
    'roomLeader', 'senior', 'preSchoolDeputyManager', 'preSchoolManager', 'deputyManager', 'nurseryManager', 'seniorManager',
    'trainingManager', 'adminAssistant', 'director', 'accountsAssistant', 'iTSupportTechnician', 'cook',
    'cleaner', 'careTaker', 'maintenanceWorker','nurseryPractitionerLevel6').required(),
    branchId: joi.number().required(),
    staffId: joi.number().required(),
    payCycleId: joi.number().required(),
    paymentMode: joi.string().valid("salary", "hourly").required(),
    employmentStartDate: joi.date().required(),
    // employmentEndDate: joi.number().required(),
    contractType: joi.string().valid("termTime", "fullTime","zeroHour").required(),
    //contractHours: joi.number().required(),
    //contractWeeks: joi.number().required(),
    contractRate: joi.number().required(),
  }),
  staffProbationPeriodDetail: joi.object().required().keys({
    duration: joi.number().required(),
    startDate: joi.date().required(),
    endDate: joi.date().required(),
  })
  })
  validatingSchema.joiValidator(req.body, schema, next)
}



module.exports = {
  add,
  update
}