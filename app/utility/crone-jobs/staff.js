/*******************************************************/
// Importing Files.
/*******************************************************/
const models = require("../../../database/sequelize/sequelize");
const database = require("../calls/databaseRequest");
/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const operator = require('sequelize').Op;
const moment = require("moment")

/*******************************************************/
// Cron Jobs.
/*******************************************************/

const deactiveStaffMembber = async () => {

    try{

        let currentDate = moment().format('YYYY-MM-DD')
        let where = {
            employmentEndDate: {
                [operator.lt]: currentDate
            },
        }
        const staffList = await database.fetchWithScope(models.staff, [{ method: ['staffContractDetails',where ] }],{},['id']);        
        let staffIds = []
        staffList.forEach(element => {
            staffIds.push(element.dataValues.id)
        });
        let action = {
            status: false,
            updatedTime : moment().unix()
        }
        let where_v2 = {
            id: staffIds
        }
        await database.bulkUpdate(models.staff,action,where_v2);


        }
        catch(err)
        {
             console.log('==== >>>  IN ERROR === >> ',err )
    
        }       

}

 
module.exports = {
    deactiveStaffMembber
}


