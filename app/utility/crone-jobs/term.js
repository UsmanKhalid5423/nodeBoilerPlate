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

/**
 * Cron-Job: It is used to message message to the campaign particiapnts.
 */
const addTerm = async () => {

    let currentYear = moment().format('YYYY');
    let startDate = moment(currentYear).startOf('year').format('YYYY-MM-DD');
    let currentYearstartDate = moment(currentYear).startOf('year').format('YYYY-MM-DD');

    const branchListing = await database.fetch(models.branch,{})

    let predefinedTerms=[]
    let name,endDate
    let previousEndDate;
    let isTermCreated = false
    let tempStartDate = moment(startDate).format('YYYY-MM-DD')
    for(let branch=0; branch < branchListing.length; branch++)
    {
        tempStartDate = moment(currentYearstartDate).format('YYYY-MM-DD')
        
        isTermCreated = false
        for(let loop=0; !isTermCreated ; loop++)
        {
            let query ={
                where : {
                    branchId: branchListing[branch].id,
                    startDate:{
                        [operator.gte]: tempStartDate
                    }
                }
            }

            let termListing = await database.fetch(models.term,query)

            if(termListing.length==0)
            {
                isTermCreated = true

                for(let i=0;i<3;i++)
                {
                    startDate = moment(currentYear).startOf('year').format('YYYY-MM-DD');
                    if(i==0)
                    {
                        name="Spring Term"
                        startDate = moment(tempStartDate).startOf('year').format('YYYY-MM-DD');
                        endDate = moment(tempStartDate).add(3,'month').startOf('month').format('YYYY-MM-DD');
                    }
                    else if(i==1)
                    {
                        name="Summer Term"
                        startDate = moment(previousEndDate).format('YYYY-MM-DD')
                        endDate  = moment(tempStartDate).add(5,'month').startOf('month').format('YYYY-MM-DD'); 
                    }
                    else if(i==2)
                    {
                        name="Autumn Term"
                        startDate = moment(previousEndDate).format('YYYY-MM-DD')
                        endDate = moment(tempStartDate).add(3,'month').endOf('month').format('YYYY-MM-DD'); 
                    }
                    predefinedTerms.push({
                        branchId: branchListing[branch].id,
                        name,
                        startDate : tempStartDate,
                        endDate,
                        createdTime: moment().unix(),
                        updatedTime: moment().unix()
                    })
                }

            }
            tempStartDate = moment(currentYearstartDate).add(loop+1,'year').startOf('year').format('YYYY-MM-DD')
            
        }
    
    }
    
    if(predefinedTerms.length>0)
    {
        await database.bulkSave(models.term, predefinedTerms);
    }

}
module.exports = {
    addTerm
}
