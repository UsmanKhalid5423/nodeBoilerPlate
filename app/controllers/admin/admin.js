/*******************************************************/
// Importing Files.
/*******************************************************/
const database = require("../../../utility/calls/databaseRequest");
const models = require("../../../../database/sequelize/sequelize");
const response = require("../../../utility/functions/response");
const pagination = require("../../../utility/functions/pagination");
const filterBy = require("../../../utility/functions/filter");
const bcrypt = require("../../../utility/functions/bcrypt");
const jwtToken = require("../../../utility/functions/jwtToken");
const nodeMailer = require("../../../utility/service/email");
const code = require("../../../utility/functions/code");

/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const moment = require("moment");
const operator = require("sequelize").Op;
const sequelize = require("sequelize");
/*******************************************************/
//Main Controllers.
/*******************************************************/

/**
 * Controller: It is used add a  Admin.
 */
const add = async (req, res, next) => {
    try {
        const result = await manageAdmin(req, new models.admin({}));
        if (result) {
            req.body.password = "******";
                
            return response.send(
                req,
                res,
                next,
                "info",
                201,
                "ADMIN_ADDED",
                result
            );
        }
    } catch (error) {
        response.send(
            req,
            res,
            next,
            "warning",
            208,
            "ADMIN_EMAIL_NOT_UNIQUE",
            error.errors[0].instance
        );
    }

};

/**
 * Controller: It is used to login admin.
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await database.findBy(models.admin, {
            email: email
        });
        if (user) {
            const comparingPasswords = await bcrypt.comparsion(
                password,
                user.password
            );
            if (comparingPasswords) {
                if (!user.status) {
                    return response.send(
                        req,
                        res,
                        next,
                        "warning",
                        202,
                        "CAN_NOT_BE_LOGGED_IN",
                        null
                    );
                }
                const authToken = await jwtToken.generatingToken(
                    {
                        id: user.id,
                        email: user.email
                    },
                    true,
                    0
                );
                user.accessToken = authToken;
                user.updatedTime = moment().unix();
                await database.save(user);
                req.body.password = "******";
                return response.send(
                    req,
                    res,
                    next,
                    "info",
                    200,
                    "LOGGED_IN",
                    user
                );
            } else {
                return next({
                    code: 401,
                    message: "AUTHORIZATION_FAILED",
                    data: null
                });
            }
        }
        return next({
            code: 401,
            message: "AUTHORIZATION_FAILED",
            data: null
        });
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
};


/**
 * Controller: It is used to resend otp code.
 */
const resendOtpCode = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await database.findBy(models.admin, {
            email: email
        });
        if (user) {
            const otpCode = code.otpCode();
            const userAuthToken = await database.findBy(models.adminAuthenticationToken, { adminId: user.id, isOtpCodeVerfied: false });
            if (!userAuthToken) {
                response.send(req, res, next, "warning", 202, "DATA_NOT_AVAILABLE", null);
            }
            userAuthToken.otpCode = otpCode;
            userAuthToken.updatedTime = moment().unix();
            await database.save(userAuthToken);

            user.updatedTime = moment().unix();
            await database.save(user);

            const emailBody = `Hi ${user.name}, <br>
                     Please use the ${otpCode} to login into the system.<br>`
            console.log("The email body is :", emailBody);
            // nodeMailer.dispatchEmail("Afforestation - Login In To Your Account", user.email, emailBody);
            emailData = {
                receiverEmail: user.email,
                otpCode: otpCode,
            }
            nodeMailer.dispatchEmail_v2("Afforestation Portal - Login In To Your Account", "LOGIN_VERIFICATION", emailData);
            return response.send(
                req,
                res,
                next,
                "info",
                200,
                "LOGGED_IN",
                user
            );

        }
        return next({
            code: 401,
            message: "AUTHORIZATION_FAILED",
            data: null
        });
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
};


/**
 * Controller: It is used to login admin.
 */
const verifyOtpCode = async (req, res, next) => {
    try {
        const { email, otpCode } = req.body;
        const user = await database.findBy(models.admin, {
            email: email
        });
        if (user) {
            const adminAuthenticationToken = await database.findBy(models.adminAuthenticationToken, { adminId: user.id, isOtpCodeVerfied: false, otpCode: otpCode });
            if (adminAuthenticationToken) {
                let timeLimit = moment((adminAuthenticationToken.updatedTime) * 1000).add(parseInt('10'), 'minutes').valueOf()
                let currentTime = moment().valueOf();
                if (Number(timeLimit) > Number(currentTime)) {
                    const authToken = await jwtToken.generatingToken(
                        {
                            id: user.id,
                            email: user.email
                        },
                        true,
                        0
                    );
                    adminAuthenticationToken.isOtpCodeVerfied = true;
                    adminAuthenticationToken.accessToken = authToken;
                    adminAuthenticationToken.updatedTime = moment().unix();
                    await database.save(adminAuthenticationToken);

                    user.updatedTime = moment().unix();
                    await database.save(user);
                    const data = {
                        token: authToken,
                        user: user
                    };
                    return response.send(
                        req,
                        res,
                        next,
                        "info",
                        200,
                        "LOGGED_IN",
                        data
                    );

                }

            }
        }
        return next({
            code: 401,
            message: "AUTHORIZATION_FAILED",
            data: null
        });
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
};


/**
 * Controller: It is used fetch admins.
 */
const fetch = async (req, res, next) => {
    try {
        let result, attributes, countQuery, filterResult;
        const { fetchType, search } = req.query;
        if (fetchType === "dropdown") {
            attributes = ["id", "name"]
            result = await database.fetch(models.admin, { where: { status: true } }, attributes);
        }
        else {
            let query = { where: {} };
            filterResult = filterBy.filter_v2(req, query);

            if (search) {
                filterBy.search(filterResult, "name", search);
            }
            countQuery = { ...filterResult };
            const paginationResult = pagination.offsetPagination(req, filterResult);
            result = await database.fetchAndCount(models.admin, paginationResult);
        }
        let data;
        if (fetchType === "dropdown") {
            data = result;
        }
        else {
            const count = await database.count(models.admin, countQuery.where);
            const cursorPagination = pagination.cursor(req, count);
            data = {
                listing: result.rows,
                pagination: cursorPagination
            };
        }
        response.send(
            req,
            res,
            next,
            "info",
            200,
            "FETCH_SUCCESSFULLY",
            data
        );

    } catch (error) {
        console.log(error);
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
};

/**
 * Controller: It is used to find a admin .
 */
const find = async (req, res, next) => {
    try {
        const adminId = req.params.id;
        const result = await database.find(models.admin, adminId);
        if (result) {
            response.send(req, res, next, "info", 200, "FETCH_SUCCESSFULLY", result);
        }
        else {
            response.send(req, res, next, "warning", 202, "DATA_NOT_AVAILABLE", null);
        }
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        })
    }
}

/**
 * Controller: It is used to update admin.
 */
const update = async (req, res, next) => {
    try {
        const adminId = req.params.id;
        const admin = await database.find(models.admin, adminId);
        if (admin) {
            const result = await manageAdmin(req, admin);
            if (result) {
                response.send(req, res, next, "info", 200, "ADMIN_UPDATED", result);
            }
        }
        else {
            response.send(req, res, next, "warning", 202, "DATA_NOT_AVAILABLE", null);
        }
    } catch (error) {
        response.send(
            req,
            res,
            next,
            "warn",
            208,
            "ADMIN_EMAIL_NOT_UNIQUE",
            error.errors[0].instance
        );
    }
}

/**
 * Controller: It is used to update status of a admin  .
 */
const updateStatus = async (req, res, next) => {
    try {
        const adminId = req.params.id;
        const { status } = req.body;
        const admin = await database.find(models.admin, adminId);
        if (admin) {
            admin.status = status;
            admin.updatedTime = moment().unix();

            const result = await database.save(admin);
            if (result) {
                if (!result.status) {
                    const adminAuthTokens = await database.fetch(models.adminAuthenticationToken, { where: { adminId: adminId } });
                    for (let adminAuthToken of adminAuthTokens) {
                        await database.truncate(
                            models.adminAuthenticationToken,
                            adminAuthToken.id
                        )
                    }
                }

                response.send(req, res, next, "info", 200, "ADMIN_UPDATED", result);
            }
        }
        else {
            response.send(req, res, next, "warning", 202, "DATA_NOT_AVAILABLE", null);
        }
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
}


/**
 * Controller: It is used to logout admin.
 */
const logout = async (req, res, next) => {
    try {
        const token = await database.findBy(
            models.user,
            {
                accessToken: req.headers.authorization
            }
        );
        if (token) {
            user.accessToken = authToken;
            user.updatedTime = moment().unix();
            await database.save(user);

            response.send(req, res, next, "info", 200, "LOGGED_OUT", null);
        }
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
};


/**
 * Controller: It is used to reset the account.
 */
const resetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await database.findBy(models.admin, {
            email: email
        });
        if (user) {
            let otpCode = code.otpCode(6);
            encryptedPassword = await bcrypt.encryption(otpCode);
            user.password = encryptedPassword
            user.updatedTime = moment().unix();
            await database.save(user);

            const emailBody = `Hi ${user.name}, <br>
                     Please use the ${otpCode} to login into the system.<br>`
            console.log("The email body is :", emailBody);
            // nodeMailer.dispatchEmail("Afforestation - Forget Password", user.email, emailBody);
            emailData = {
                receiverEmail: user.email,
                password: otpCode,
            }
            nodeMailer.dispatchEmail_v2("Afforestation Portal - Login In To Your Account", "PASSWORD_RESET", emailData);

            return response.send(
                req,
                res,
                next,
                "info",
                200,
                "PASSWORD_RESET",
                null
            );

        }
        return next({
            code: 401,
            message: "AUTHORIZATION_FAILED",
            data: null
        });
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
};


/**
 * Controller: It is used to login admin.
 */
const updatePassword = async (req, res, next) => {
    try {
        const { email, newPassword, currentPassword } = req.body;
        const user = await database.findBy(models.admin, {
            email: email
        });

        if (user) {
            const comparingPasswords = await bcrypt.comparsion(
                currentPassword,
                user.password
            );
            if (comparingPasswords) {
                let encryptedPassword = await bcrypt.encryption(newPassword);
                user.password = encryptedPassword
                user.updatedTime = moment().unix();
                await database.save(user);

                return response.send(
                    req,
                    res,
                    next,
                    "info",
                    200,
                    "PASSWORD_RESET",
                    null
                );
            }
            else {
                return next({
                    code: 422,
                    message: "PASSWORD_MISMATCH",
                    data: "Current password is not correct."
                });
            }
        }
        return next({
            code: 401,
            message: "AUTHORIZATION_FAILED",
            data: null
        });
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
};

/*******************************************************/
// Exporting Controllers.
/*******************************************************/
module.exports = {
    add,
    login,
    resendOtpCode,
    verifyOtpCode,
    fetch,
    find,
    update,
    updateStatus,
    logout,
    resetPassword,
    updatePassword
}

/*******************************************************/
// Internal Functions.
/*******************************************************/

/**
 * Function: It is manage admin.
 */
const manageAdmin = async (req, admin) => {
    const { name, email, password, role } = req.body;
    let encryptedPassword;
    admin.name = name;
    admin.email = email;
    admin.role = role;
    if (admin.createdTime) {
        if (password) {
            encryptedPassword = await bcrypt.encryption(password);
            admin.password = encryptedPassword
        }
        // admin.profilePicture = (req.file) ? req.file.location : admin.profilePicture
        admin.updatedTime = moment().unix();
    } else {
        encryptedPassword = await bcrypt.encryption(password);
        // admin.profilePicture = (req.file) ? req.file.location : "https://andpercent-afforestation.s3.ap-south-1.amazonaws.com/uploads/user%402x.png"
        admin.password = encryptedPassword
        admin.createdTime = moment().unix();
        admin.updatedTime = moment().unix();
    }
    return await database.save(admin);
}


