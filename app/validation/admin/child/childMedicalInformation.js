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
        childDoctorDetail: joi.object().required().keys({
            childId: joi.number().required(),
            doctorName: joi.string().required(),
            // made optional in M8
            //surgeryName: joi.string().required(),
            //address: joi.string().required(),
            //city: joi.string().required(),
            //streetNumber: joi.string().required(),
            //postalCode: joi.string().required(),
            //latitude: joi.number().required(),
            //longitude: joi.number().required(),
            workTelephoneNumber: joi.number().required(),
            // healthVisitorName: joi.string().required(),
        }),
        childMedicalInformation: joi.object().required().keys({
            prescribedMedicationToken: joi.boolean().required(),
            // prescribedMedicationTokenDescription: joi.string().required(),
            doesChildHaveAnySpecialDietOrHealthProblemOrAllergies: joi.boolean().required(),
            // doesChildHaveAnySpecialDietOrHealthProblemOrAllergiesDescription: joi.string().required(),
            areThereAnyProfessionalsInvolvedWithTheChild: joi.boolean().required(),
            // areThereAnyProfessionalsInvolvedWithTheChildDescription: joi.string().required(),
            isTheChildBeingTreatedAtAHospital: joi.boolean().required(),
            // isTheChildBeingTreatedAtAHospitalDescription: joi.string().required(),
            areChildImmunitiesUpToDate: joi.boolean().required(),
            // areChildImmunitiesUpToDateDescription: joi.string().required(),
            doesTheChildHaveEarlyYearActionOrSupport: joi.boolean().required(),
            // doesTheChildHaveEarlyYearActionOrSupportDescription: joi.string().required(),
            areChildImmunitiesUpToDate: joi.boolean().required(),
            // areChildImmunitiesUpToDateDescription: joi.string().required(),
            doesTheChildHaveAnyDistinguishingMarks: joi.boolean().required(),
            // doesTheChildHaveAnyDistinguishingMarksDescription: joi.string().required(),
            areChildImmunitiesUpToDate: joi.boolean().required(),
            // areChildImmunitiesUpToDateDescription: joi.string().required(),
            wasTheChildBornPrematurely: joi.boolean().required(),
            // wasTheChildBornPrematurelyDescription: joi.string().required(),
            doParentsHaveAnyConcernsOverTheChildDevelopment: joi.boolean().required(),
            // doParentsHaveAnyConcernsOverTheChildDevelopmentDescription: joi.string().required(),
        })
    })
    validatingSchema.joiValidator(req.body, schema, next)
}

module.exports = {
    addAndUpdate
}