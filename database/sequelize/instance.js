/*******************************************************/
// Importing Files.
/*******************************************************/
const config = require("../../config/db");

/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const Sequelize = require("sequelize");

/*******************************************************/
// Exporting Database Connection.
/*******************************************************/

const databaseInstance = () => {
  let instance = null;
  if (!instance) {
    instance = new Sequelize(config.database, config.user, config.pass, {
      host: config.host,
      dialect: config.dialect,
      dialectOptions: {
        charset: config.charset
      },
      pool: {
        min: config.minConnections,
        max: config.maxConnections,
        idle: config.delayBeforeReconnect
      },
      logging: false,
      define: {
        timestamp: config.timeStamp,
        paranoid: config.paranoid
      }
    });
    instance.dialect.supports.schemas = true;
    /*******************************************************/
    // Syncing Sequelize With Database.
    /*******************************************************/
    // instance
    //     //  .sync({alter: true})
    //     .sync()
    //     .then(() => {
    //         console.log('Datebase connection for the Node application has been established successfully.');
    //     })
    //     .catch(err => {
    //         console.error('Unable to connect to the SDN due to:', err);
    //     });
  }
  return instance;
};

/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
  Sequelize,
  databaseInstance,
};
