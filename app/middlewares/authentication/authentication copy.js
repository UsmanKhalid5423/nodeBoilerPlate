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
            console.log("->", token);
            if (token.length > 0) {
                let loginUserData = {};
                let data, userRole;
                if (model === models.admin) {
                    userRole = "superAdmin";
                    data = await database.findBy(models.admin, { accessToken: token })
                    loginUserData["loginRole"] = "admin";
                    // loginUserData["priviledgeRole"] = userRole;

                }
                else if (model === models.staff) {
                    data = await database.findByWithScope(models.staff, ['staffContract'], { accessToken: token })
                    if (data) {
                        loginUserData["loginRole"] = "staff";
                        userRole = data.staffContractDetail.role;
                    }
                }
                loginUserData["priviledgeRole"] = userRole;
                console.log("-roles>", roles);
                console.log("-userRole>priviledgeRole", userRole);
                if (data) {
                    loginUserData["detail"] = data;
                    req.loginUser = loginUserData;

                    if (roles.includes("*"))
                        return next();

                    else if (roles.includes(userRole))
                        return next();

                    return next({
                        code: 401,
                        message: "UN_AUTHORIZED_USER",
                        data: null
                    })
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
        } catch (error) {
            return next({
                code: 401,
                message: "UN_AUTHORIZED_USER",
                data: null
            })
        }
    };
};




