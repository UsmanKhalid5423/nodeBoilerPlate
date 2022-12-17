/*******************************************************/
// Assigning Endpoints to the Routes.
/*******************************************************/
module.exports = function (app) {
    app.use('/api/v1/lms/admin', require('./admin/admin.js'));
    app.use('/api/v1/lms/admin', require('./branch/branch'));
    app.use('/api/v1/lms/admin', require('./child/child'));
}
