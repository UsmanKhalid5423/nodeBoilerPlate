/*******************************************************/
// Importing Files.
/*******************************************************/
const sequelize = require("./../sequelize/instance");

/*******************************************************/
// Defining Instances of Databases
/*******************************************************/
const Sequelize = sequelize.Sequelize;
const instance = sequelize.databaseInstance();

/*******************************************************/
// Syncing Campaign Database with Database Models.
/*******************************************************/



const database = {
	instance: instance,
	Sequelize: Sequelize,
	admin: require("./../schemas/admin")(instance, Sequelize),
	branch: require("../schemas/branch")(instance, Sequelize),
	child: require("../schemas/child")(instance, Sequelize),
};

/*******************************************************/
// Making Database Relations.
/*******************************************************/
require("./associations")(database);
require("./scopes")(database);
// (require("./hooks"))(database);

/*******************************************************/
// Exporting Database.
/*******************************************************/
module.exports = database;
