
/*******************************************************/
// Importing Files.
/*******************************************************/
const templates = require("./node-mailer/templates");

/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const nodemailer = require("nodemailer");
require("dotenv").config();

/*******************************************************/
//Defining variables.
/*******************************************************/
let email, password, supportEmail;
switch (process.env.ENV) {
    case "development":
        email = process.env.PROVIDER_EMAIL_DEVELOPMENT
        password = process.env.PROVIDER_EMAIL_PASSWORD_DEVELOPMENT
        break;
    case "staging":
        email = process.env.PROVIDER_EMAIL_STAGING
        password = process.env.PROVIDER_EMAIL_PASSWORD_STAGING
        break;
    case "production":
        email = process.env.PROVIDER_EMAIL_PRODUCTION
        password = process.env.PROVIDER_EMAIL_PASSWORD_PRODUCTION
        break;
}

/*******************************************************/
//Email service.
/*******************************************************/

const dispatchEmail = (subject, receiverEmail, body) => {
    let receipents = [];
    receipents.push(receiverEmail, email)


    const transporter = nodemailer.createTransport({
        // host: 'smtp.gmail.com',
        service: 'gmail',
        secure: true,
        port: 565,
        auth: {
            user: email,
            pass: password
        },
    });

    const mailOptions = {
        from: '"Afforestation"' + '<' + email + '>',
        to: receipents,
        subject: subject,
        html: body
    };
    console.log("?");
    transporter.sendMail(mailOptions, function (error, info) {
        console.log("Email section.");
        if (error) {
            console.log("IN THE ERROR.");
            console.log(error);
            console.log(info);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

const dispatchEmail_v2 = (subject, template, data) => {
    let emailTemplate;
    switch (template) {
        case "LOGIN_VERIFICATION":
            emailTemplate = templates.loginVerification(data.otpCode);
            break;
        case "PASSWORD_RESET":
            emailTemplate = templates.passwordReset(data.password);
            break;
      }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        port: 565,
       
        // host: process.env.PROVIDER_EMAIL_SERVICE,
        auth: {
            user: email,
            pass: password
        },
    });

    const mailOptions = {
        from: '"Afforestation Portal"' + '<' + email + '>',
        to: data.receiverEmail,
        subject: subject,
        html: emailTemplate
    };
    transporter.sendMail(mailOptions, function (error, info) {
        console.log("Email section.");
        if (error) {
            console.log("IN THE ERROR.");
            console.log(error);
            console.log(info);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}
/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
    dispatchEmail,
    dispatchEmail_v2,
};