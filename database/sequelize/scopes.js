/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const moment = require("moment");
const operator = require("sequelize").Op;
const sequelize = require("sequelize");
/*******************************************************/

//change

module.exports = function (model) {
    


    model.child.addScope('branchChilds', (where) => ({
        include: [
            {
                model: model.branch,
                as: 'branch',
                required: true,
                //where: where,
            },
        ]
        }), {
            override: true
        });


};


