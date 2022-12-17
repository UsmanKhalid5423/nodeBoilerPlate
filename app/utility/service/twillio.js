/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
require("dotenv").config();
// const messagingResponse = require('twilio').twiml.MessagingResponse;

/*******************************************************/
// Configuring Twillio.
/*******************************************************/
// const twilio = require("twilio")(
//     process.env.TWILLIO_ACCOUNT_SID,
//     process.env.TWILLIO_AUTH_TOKEN
// );

/*******************************************************/
// Returning Response.
/*******************************************************/
const sendSingleMessage = (to, sms) => {
    twilio.messages
        .create({
            body: sms,
            from: process.env.TWILLIO_PHONE_NUMBER,
            to: to
        })
        .then(message => console.log("MESSAGE __>", message.sid))
        .catch(err => console.log("Err while sending noti:: ", err));
};

const sendBulkMessages = async (numbers, sms) => {
    console.log("From", from);
    console.log("in the bulk twillio. ");
    Promise.all(
        numbers.map(number => {
            return twilio.messages.create({
                to: number,
                from: process.env.TWILLIO_PHONE_NUMBER,
                body: sms
            });
        })
    )
        .then(messages => {
            console.log('Messages sent!');
        })
        .catch(err => console.error(err));
};

const replyToMessage = () => {
    const twiml = new MessagingResponse();
    return twiml.message('You can not reply to this message.');
};

/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
    sendSingleMessage,
    sendBulkMessages,
    replyToMessage
};
