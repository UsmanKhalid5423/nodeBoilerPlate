/*******************************************************/
// Importing Files.
/*******************************************************/
const appLanguage = require("./app/middlewares/applicationLanguage");
//require('./database/sequelize/sequelize');

/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const express = require('express');
const moment = require('moment');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require('cors');
const os = require('os');
require('dotenv').config()
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
/*******************************************************/
// Configuring Application.
/*******************************************************/
const app = express();
const options = {
    optionsSuccessStatus: 200
};
app.use(cors(options));
app.options('*', cors(options));
app.use(morgan("dev"));
app.use('/uploads', express.static(__dirname + '../uploads'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(appLanguage());
app.use('/uploads', express.static(__dirname + '/uploads'));


/*******************************************************/
// Configring Swagger.
/*******************************************************/
const swaggerOptions = {
    definition: {
        info: {
            title: 'Sample Node Project',
            description: 'Basic Template for documenting the apis.',
            version: '1.0.0',
        },
    },
    // apis: ['./app/routes/**/*.js'],
    apis: ['./app/routes/Controller/**/*.js'],
    // apis: ['./app/routes/controller/admin/index/*.js'],
    // working
    //apis: ['./app/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


/*******************************************************/
// Configuring Server.
/*******************************************************/
const server = app.listen(process.env.PORT, function () {
    // logger.consoleInfo("Node application is listening at " + process.env.PORT + " port.");
    console.log("Node application is listening at " + process.env.PORT + " port.");
});

server.timeout = 80 * 1000;


/*******************************************************/
// Incoming Requests.
/*******************************************************/
require("./app/middlewares/request")(app);



/*******************************************************/
// Assigning Endpoints to the Routes.
/*******************************************************/

/**
 * Routes: ADMIN.
 */
require("./app/routes/controller/admin/index")(app);

/*******************************************************/
// Handling Errors.
/*******************************************************/
app.use((req, res, next) => {
    next({
        code: 404,
        message: "ROUTE_NOT_AVAILABLE"
    })
});

require("./app/middlewares/error")(app);

/*******************************************************/
// Exporting Modules.
/*******************************************************/
module.exports = server

