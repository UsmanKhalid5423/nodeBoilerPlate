/*******************************************************/
// Authenticating Requesting User.
/*******************************************************/
module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    req.loginUser = token;
    next();
};
