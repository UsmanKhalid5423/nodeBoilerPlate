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
        childBookingDetail: joi.object().required().keys({
            branchId: joi.number().required(),
            roomId: joi.number().required(),
            joiningDate: joi.date().required(),
            type: joi.string().valid("termOnly", "fullYear", "nonTerm").required(),
        }),
        sessionDetail: joi.array().min(1).max(5).required().items(
            joi.object().keys({
                // sessionId: joi.number().required(),
                startTime: joi.number().required(),
                endTime: joi.number().required(),
                day: joi.string().valid("monday", "tuesday", "wednesday", "thursday", "friday").required(),
            })
        )

    })
    validatingSchema.joiValidator(req.body, schema, next)
}

const endBooking = (req, res, next) => {
    schema = joi.object().keys({
        leavingDate: joi.date().required(),
    })
    validatingSchema.joiValidator(req.body, schema, next)
}



module.exports = {
    addAndUpdate,
    endBooking
}