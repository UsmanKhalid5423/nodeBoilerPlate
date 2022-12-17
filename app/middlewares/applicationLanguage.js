module.exports = function () {
    return function (req, res, next) {
        req.appLanguage = "en";
        var language = String(req.headers['language']).trim().toLowerCase();
        if (language === "ur") {
            req.appLanguage = language;
        }
        return next();
    };
};
