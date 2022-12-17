/*******************************************************/
// Importing Files.
/*******************************************************/
const models = require("../../../database/sequelize/sequelize");
const database = require("../calls/databaseRequest");
const lodash = require("./../functions/lodash")
/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const operator = require('sequelize').Op;
const moment = require("moment")

/*******************************************************/
// Cron Jobs.
/*******************************************************/

// step 1 get today staff which have to be present today
// get list of staff present today
// loadLast remove present and get all which are not present in staffAttendance Table 
// now mark absent 


const markStaffAttendance = async () => {
    const allBranches = await getAllBranches();
    //moment().subtract(1, 'days');
    const date = moment(moment().unix() * 1000).subtract(1, 'days').format('YYYY-MM-DD');
    console.log('Day : ',date)
    //check holiday or not
    let chk=0;
    const todayStaffAttendance = await getTodayStaffAttendance();
    
    for(let branch of allBranches)
    {
       const checkHoliday = await checkBranchHoliday(branch.id);
       if(!checkHoliday)
       {
        
        const todayStaffShift = await getTodayStaffShift(branch.id);
        let todayStaffToBePresent=[];
        todayStaffShift.forEach(element => {
            
            todayStaffToBePresent.push(
                {
                    staffId: element.id,
                    branchId: element.branchId,
                    roomId: element.roomId,
                    attendance: 'absent',
                    createdDate: date,
                    createdTime: moment().unix(),
                    updatedTime: moment().unix()
                }
            )
            

        });
            
            // working and have to put conditions
            console.log('============================= TODAY STAFF ATTENDANCE===========================',branch.id)
            console.log(todayStaffAttendance.length)
            console.log('========================================================')

            console.log('============================= TODAY STAFF TO BE PRESENT===========================')
            console.log(todayStaffToBePresent.length)
            console.log('============================= ===========================')

            //working
            let staffAbsentList;

            if(todayStaffAttendance.length>0 && ( todayStaffToBePresent.length > todayStaffAttendance.length || todayStaffToBePresent.length === todayStaffAttendance.length ) )
            {
                let counter=0
                console.log('First If')
               
                //working
                // todayStaffToBePresent.forEach(todayStaff => {
                //     todayStaffAttendance.forEach(todayAttendance => {
                //         if(todayStaff.staffId!=todayAttendance.staffId && todayStaff.branchId!=todayAttendance.branchId) 
                //         {
                //             counter++;
                //         }
                //     });
                //     if(counter==0)
                //     {
                //         console.log('data pushed')

                //         staffAbsentList.push({
                //             staffId: todayStaff.staffId,
                //             branchId: todayStaff.branchId,
                //             roomId: todayStaff.roomId,
                //             attendance: 'absent',
                //             createdDate: date,
                //             createdTime: moment().unix(),
                //             updatedTime: moment().unix()
                //         })
                //     }
                //     counter=0;
                // });

                // Method Changed
                staffAbsentList=getDifference(todayStaffToBePresent,todayStaffAttendance,)


                //staffAbsentList = todayStaffToBePresent.filter(({ value: id1 }) => !todayStaffAttendance.some(({ value: id2 }) => id2 === id1));
                
                //staffAbsentList = lodash.difference(todayStaffToBePresent,todayStaffToBePresent)
                console.log('+++++= Length +++ ',staffAbsentList.length)
                // if(staffAbsentList.length>0)
                // {
                //     console.log('Record Inserted')
                //     await markAbsent(staffAbsentList)
                // }
                
            }
            else if(todayStaffAttendance.length>0 && todayStaffToBePresent.length < todayStaffAttendance.length)
            {
                let counter=0;
                console.log('second If')
                //working
                // todayStaffToBePresent.forEach(todayStaff => {
                //     todayStaffAttendance.forEach(todayAttendance => {
                //         console.log('todayStaffAttendance',todayAttendance.staffId)
                //         console.log('todayStaff',todayStaff.staffId)

                //         if(todayStaff.staffId==todayAttendance.staffId && todayStaff.branchId==todayAttendance.branchId) 
                //         {
                //             counter++;
                            
                //         }
                       
                //     });

                //     if(counter==0)
                //     {
                //         console.log('data pushed')

                //         staffAbsentList.push({
                //             staffId: todayStaff.staffId,
                //             branchId: todayStaff.branchId,
                //             roomId: todayStaff.roomId,
                //             attendance: 'absent',
                //             createdDate: date,
                //             createdTime: moment().unix(),
                //             updatedTime: moment().unix()
                //         })
                //     }
                //     counter=0;
                // });

                //method Changed
                staffAbsentList=getDifference(todayStaffToBePresent,todayStaffAttendance,)

                //console.log('staffAbsentList',staffAbsentList)

                // if(staffAbsentList.length>0)
                // {
                //     console.log('Record Inserted')
                //     await markAbsent(staffAbsentList)
                // }
                //staffAbsentList = todayStaffAttendance.filter(({ value: id1 }) => !todayStaffToBePresent.some(({ value: id2 }) => id2 === id1));
            }
            console.log(todayStaffAttendance.length===0)
            console.log(todayStaffAttendance.length==0)

            if(todayStaffAttendance.length === 0)
            {
            
                console.log('Else')

                console.log('staffAbsentList',staffAbsentList)
                // console.log('todayStaffToBePresent',todayStaffToBePresent.length)

                staffAbsentList = todayStaffToBePresent
                console.log(todayStaffAttendance.length===0)
                console.log('staffAbsentList',staffAbsentList)


                // if(staffAbsentList)
                // {
                //     console.log('Record Inserted')
                //     await markAbsent(staffAbsentList)
                // }
                // if(staffAbsentList.length>0)
                // {
                //     console.log('Record Inserted')
                //     await markAbsent(staffAbsentList)
                // }
            }
            console.log('============================= STAFF ABSENT LIST===========================')
            if(staffAbsentList.length>0)
            {
                console.log('Record Inserted')
                await markAbsent(staffAbsentList)
            }
            console.log('============================= ===========================')
       }
    }
    
}

const getAllBranches= async () =>{
    const result= await database.fetch(models.branch,{},['id','name'])
    return result;
}


const checkBranchHoliday = async (branchId) =>{
    const startDate = moment(moment().unix() * 1000).format('YYYY-MM-DD');
    const branchEventHolidays = await database.fetch(models.calendar, {where: {
        branchId: branchId,  
        //SELECT * FROM `calendar` WHERE (startDate>='2021-08-26' || startDate<='2021-08-26') && (endDate<='2021-08-26' || endDate>='2021-08-26') and branchId=87 
        [operator.and]: [  
        {
            [operator.or]:[
                {
                    startDate:{
                        [operator.gte]: startDate
                    }, 
                },
                {
                    startDate:{
                        [operator.lte]: startDate
                    }, 
                }
            ]
                
        }, 
        {
            [operator.or]:[
                {
                    endDate:{
                        [operator.gte]: startDate
                    }, 
                },
                {
                    endDate:{
                        [operator.lte]: startDate
                    }, 
                }
            ]    
        },
        
    ]}})

    if(branchEventHolidays.length==0)
    {
        return false
    }
    else
    {
        return true
    }
}

const getTodayStaffShift = async (branchId) => {
    //working
    //const result = await database.fetchWithScope(models.staff,'staffShiftPattern',{},['id','roomId','branchId','roomId'])
    
    const result = await database.fetchWithScope(models.staff,'staffShiftPattern_v2',{where:{branchId:branchId}},['id','branchId','roomId'])
    
    
    //console.log('Result Is : ',result.length)
   //let chk=0;
    // for(let v of result)
    // {
    //         console.log('Result Is : ',result)
    // }
    return result;
}

const getTodayStaffAttendance  = async () => {
    const date = moment(moment().unix() * 1000).subtract(1, 'days').format('YYYY-MM-DD');
    const result = await database.fetch(models.staffAttendance,{
        where:{
            createdDate: date,
            //branchId: branchId
        }},
        ['staffId','branchId','roomId','attendance','createdDate']
        )
    return result

}

const markAbsent = async (staffList)=>{
    await database.bulkSave(models.staffAttendance,staffList)
}

const getDifference=(todayStaffToBePresent,todayStaffAttendance)=>{
    let counter=0
    const date = moment(moment().unix() * 1000).subtract(1, 'days').format('YYYY-MM-DD');
    let staffAbsentList=[]
    todayStaffToBePresent.forEach(todayStaff => {
        todayStaffAttendance.forEach(todayAttendance => {
            //if(todayStaff.staffId!=todayAttendance.staffId && todayStaff.branchId!=todayAttendance.branchId ) 
            if(todayStaff.staffId==todayAttendance.staffId && todayStaff.branchId==todayAttendance.branchId && todayStaff.roomId==todayAttendance.roomId)
            {
                counter++;
            }
        });
        if(counter==0)
        {
            console.log('data pushed')

            staffAbsentList.push({
                staffId: todayStaff.staffId,
                branchId: todayStaff.branchId,
                roomId: todayStaff.roomId,
                attendance: 'absent',
                createdDate: date,
                createdTime: moment().unix(),
                updatedTime: moment().unix()
            })
        }
        counter=0;
    });

    return staffAbsentList;


}

module.exports = {
    markStaffAttendance
}
