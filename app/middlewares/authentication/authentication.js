/*******************************************************/
// Importing Files.
/*******************************************************/
const models = require("../../../database/sequelize/sequelize");
const database = require("../../utility/calls/databaseRequest");

/*******************************************************/
// Authenticating Requesting User.
/*******************************************************/

module.exports = function (model, roles) {
    return async (req, res, next) => {

        try {
            const token = req.headers.authorization;
            let loginUserData = {};
            if (model === models.admin) {
                const authenticationTokenResult = await database.findBy(models.admin,{accessToken: token})
                if (authenticationTokenResult) {
                    const userInformation = await models.admin.findByPk(authenticationTokenResult.adminId);
                    loginUserData = {
                        role: "admin",
                        detail: userInformation
                    }
                    req.loginUser = loginUserData;
                     
                    if (roles.includes("*")) {
                        return next();
                    }
                    else if (roles.includes(userInformation.role)) {
                        return next();
                    }
                    return next({
                        code: 403,
                        message: "UN_AUTHORIZED_USER",
                        data: null
                    })
                   }
                else {
                    return next({
                        code: 401,
                        message: "UN_AUTHORIZED_USER",
                        data: null
                    })
                }
            }
            else {

                model.findOne({
                    where: {
                        accessToken: token
                    }
                }).then(function (data) {
                    if (data) {
                        if (model === models.admin) {
                            loginUserData["role"] = "admin";
                        }
                        else if (model === models.gardener) {
                            loginUserData["role"] = "gardener";
                        }

                        if (roles.includes("*")) {
                            loginUserData["detail"] = data;
                            req.loginUser = loginUserData;
                            return next();
                        }
                        else if (roles.includes(data.role)) {
                            loginUserData["detail"] = data
                            req.loginUser = loginUserData;
                            return next();
                        }
                        return next({
                            code: 401,
                            message: "UN_AUTHORIZED_USER",
                            data: null
                        })
                    } else {
                        return next({
                            code: 401,
                            message: "UN_AUTHORIZED_USER",
                            data: null
                        })
                    }
                }).catch(function (err) {
                    console.log(err);
                })


            }
        } catch (error) {
            console.log("hhere??");
            console.log(error);
            return next({
                code: 401,
                message: "UN_AUTHORIZED_USER",
                data: null
            })
        }
    };
};




