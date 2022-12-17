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

const updateChildAgeGroup = async () => {

    const ageGroupList = await database.fetch(models.predefinedAgeGroup,{})
    //const attributes = ['id','ageGroupId','dateOfBirth']
    //const childrenList = await database.fetch(models.child,{},attributes)
    const childrenList = await database.fetch(models.child,{})
    const childList = []
    for(let child of childrenList)
    {

        const currentMoment = moment(new Date());
        let dobMoment = moment(new Date(child.dateOfBirth));
        const months = currentMoment.diff(dobMoment, 'months');
        //console.log('==== >>>>> current Age Group is ==== >>> ',child.ageGroupId)
        
        const ageGroup = ageGroupList.find(element => element.minimumAge <= months && element.maximumAge >= months);
        let previousAgeGroup = child.ageGroupId
        child.ageGroupId = ( ageGroup)? ageGroup.id: null;
        
        //console.log('++++++ >>>>> Updated Age Group is +++++++ >>> ',child.ageGroupId)
        
        

        if(previousAgeGroup!=child.ageGroupId)
        {
            child.updatedTime = moment().unix()
            childList.push(child.dataValues)
            await database.save(child)
        }
    }

    if(childList.length>0)
    {
        console.log('==== >>> upadating child === >>> ')
        //await database.bulkSave(models.child,childList)
    }

}

 
module.exports = {
    updateChildAgeGroup
}


