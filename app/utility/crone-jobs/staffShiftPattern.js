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

const endShiftPattern = async () => {

    try{

        let query = {
            where:{
                isDeleted: false,
                leavingDate:{
                    [operator.lt]: moment().format('YYYY-MM-DD')
                }
            }
        }
        let staffShiftPatternList = await database.fetch(models.staffShiftPattern,query)

        console.log('===== >> staffShiftPatternList === >>',staffShiftPatternList)


        console.log('===>> staffShiftPatternList.length === >> ',staffShiftPatternList.length)
        
        for(let staffPattern=0; staffPattern < staffShiftPatternList.length; staffPattern++)
        {
            console.log('===>> shiftPattern=== >> ',staffPattern)

            // fetch shift Pattern details
            let pattern = staffShiftPatternList[staffPattern]
            let query_v2 = {
                where:{
                    staffShiftPatternId: pattern.id
                }
            }
            console.log('=== >> query_v2 == >> ',query_v2)
            let staffShiftPatternDetail = await database.fetch(models.staffShiftPatternDetail,query_v2)
            console.log('=== >> staffShiftPatternDetail == >> ',staffShiftPatternDetail)
            if(staffShiftPatternDetail && staffShiftPatternDetail.length>0)
            {
                // making logs
                let shiftPatternLog = new models.staffShiftPatternLog({})
                shiftPatternLog.staffShiftPatternId = pattern.id
                shiftPatternLog.staffId = pattern.staffId
                shiftPatternLog.branchId = pattern.branchId
                shiftPatternLog.roomId = pattern.roomId
                shiftPatternLog.joiningDate = pattern.joiningDate
                shiftPatternLog.leavingDate = pattern.leavingDate
                shiftPatternLog.createdTime = moment().unix()
                shiftPatternLog.updatedTime = moment().unix()
                let shiftPatternLogDetail = await database.save(shiftPatternLog)


                console.log('=== >> shiftPatternLogDetail === >>',shiftPatternLogDetail)

                let shiftPatternDetailLog = []

                // staffShiftPatternDetail.forEach(shiftDetail => {
                //     shiftPatternDetailLog.push({
                //         staffShiftPatternLogId: shiftPatternLogDetail.id,
                //         staffId: shiftDetail.staffId,
                //         branchId: shiftDetail.branchId,
                //         roomId: shiftDetail.roomId,
                //         day: shiftDetail.day,
                //         startDate: moment.utc(shiftDetail.startDate * 1000).unix(),
                //         endDate: moment.utc(shiftDetail.endDate * 1000).unix(),
                //         breakDeduction: shiftDetail.breakDeduction ? shiftDetail.breakDeduction : 0,
                //         createdTime: moment().unix(),
                //         updatedTime: moment().unix(),
                //     })
                // });



                for(let i=0;i<5;i++)
                {
                    let shiftDetail = staffShiftPatternDetail[i]

                    shiftPatternDetailLog.push({
                        staffShiftPatternLogId: shiftPatternLogDetail.id,
                        staffId: shiftDetail.staffId,
                        branchId: shiftDetail.branchId,
                        roomId: shiftDetail.roomId,
                        day: shiftDetail.day,
                        startDate: moment.utc(shiftDetail.startDate * 1000).unix(),
                        endDate: moment.utc(shiftDetail.endDate * 1000).unix(),
                        breakDeduction: shiftDetail.breakDeduction ? shiftDetail.breakDeduction : 0,
                        createdTime: moment().unix(),
                        updatedTime: moment().unix(),
                    })
                }



                await database.remove(models.staffShiftPattern,pattern.id)

                let action ={
                    isDeleted : true,
                    deletedTime: moment().unix()
                };
                let where = {
                    staffShiftPatternId: pattern.id
                }
                await database.bulkUpdate(models.staffShiftPatternDetail,action,where)
                await database.bulkSave(models.staffShiftPatternDetailLog,shiftPatternDetailLog)
                staffShiftPatternDetail = null
                shiftPatternLog = null
                shiftPatternLogDetail = null
        }
        

        }
    }
    catch(err)
    {
        console.log('==== >>>  IN ERROR === >> ',err )

    }       

}

 
module.exports = {
    endShiftPattern
}


/**
 * Function: DATA AVAILABILITY BEFORE ADDING SHIFT PATTERN.
 */
 const updateStaffAttendance = async (staffShiftPattern,staffShiftPatternDetail) => {
    let joiningDate = staffShiftPattern.joiningDate
    let leavingDate = staffShiftPattern.leavingDate ? staffShiftPattern.leavingDate : moment().format('YYYY-MM-DD')

    let query = {
        where:{
            staffId: staffShiftPattern.staffId,
            isDeleted: false,
            attendance: 'present',
            [operator.and]:[
                {
                    createdDate:{
                        [operator.gte]: joiningDate
                    }
                },
                {
                    createdDate:{
                        [operator.lte]: leavingDate
                    }
                }
            ]
        }
    }


    const stattAttendanceList = await database.fetch(models.staffAttendance,query)

    let list = []
    //stattAttendanceList.forEach(async attendance => {
      for(let i=0; i< stattAttendanceList.length; i++)
      {
        //let attendance = stattAttendanceList[i].dataValues

        let day = moment(stattAttendanceList[i].createdDate).format('dddd').toLowerCase()
        let index = staffShiftPatternDetail.findIndex(x=>x.day==day)
        
        console.log('==== >> index == >> ',index)

        if(index!=-1 && staffShiftPatternDetail[index].startDate > 0)
        {
            console.log('==== >> staffShiftPatternDetail == >> ',staffShiftPatternDetail[index])

            const staffScheduledTimeInHour = moment.unix(staffShiftPatternDetail[index].startDate).format('HH')
            const staffScheduledTimeInMinutes = moment.unix(staffShiftPatternDetail[index].startDate).format('mm')
            
            const staffScheduledTimeOutHour = moment.unix(staffShiftPatternDetail[index].endDate).format('HH')
            const staffScheduledTimeOutMinutes = moment.unix(staffShiftPatternDetail[index].endDate).format('mm')
            
            let currentDateScheduledTimeIn = moment(moment(stattAttendanceList[i].createdDate).format('YYYY-MM-DD 00:00:00')).unix();
            currentDateScheduledTimeIn = moment(moment(currentDateScheduledTimeIn*1000).add(staffScheduledTimeInHour,'hours')).unix();
            currentDateScheduledTimeIn = moment(moment(currentDateScheduledTimeIn*1000).add(staffScheduledTimeInMinutes,'minutes')).unix();
            currentDateScheduledTimeIn = moment.utc(currentDateScheduledTimeIn*1000).unix()
            
            let currentDateScheduledTimeOut = moment(moment(stattAttendanceList[i].createdDate).format('YYYY-MM-DD 00:00:00')).unix();
            currentDateScheduledTimeOut = moment(moment(currentDateScheduledTimeOut*1000).add(staffScheduledTimeOutHour,'hours')).unix();
            currentDateScheduledTimeOut = moment(moment(currentDateScheduledTimeOut*1000).add(staffScheduledTimeOutMinutes,'minutes')).unix();
            currentDateScheduledTimeOut = moment.utc(currentDateScheduledTimeOut*1000).unix()

            stattAttendanceList[i].scheduledTimeIn = currentDateScheduledTimeIn
            stattAttendanceList[i].scheduledTimeOut = currentDateScheduledTimeOut


            stattAttendanceList[i].todayBreakTimeAllowedInMinutes = staffShiftPatternDetail[index].breakDeduction
                
            let scheduledTimeInMinutes = stattAttendanceList[i].scheduledTimeOut - stattAttendanceList[i].scheduledTimeIn
            scheduledTimeInMinutes = scheduledTimeInMinutes / 60
            // subtract break
            scheduledTimeInMinutes -= staffShiftPatternDetail[index].breakDeduction
            stattAttendanceList[i].scheduledTimeInMinutes = scheduledTimeInMinutes
            scheduledTimeInMinutes = Math.round( ( scheduledTimeInMinutes/60 + Number.EPSILON) * 100) / 100
            //scheduledTimeInMinutes = Math.ceil(stattAttendanceList[i].scheduledTimeInMinutes/60)
            stattAttendanceList[i].scheduledHours = scheduledTimeInMinutes

            stattAttendanceList[i].scheduledHours = Math.ceil(stattAttendanceList[i].scheduledHours * 100) / 100//Math.round( ( stattAttendanceList[i].scheduledHours + Number.EPSILON) * 100) / 100

            let caluculation = await calculateAttendanceDiscrepancyStatus(stattAttendanceList[i])
            let discrepancyStatus = caluculation.discrepancyStatus
            stattAttendanceList[i].calculatedTimeInMinutes = caluculation.minutes

            stattAttendanceList[i].timeStatus = discrepancyStatus
            stattAttendanceList[i].updatedTime = moment().unix()
            //await database.save(stattAttendanceList[i])
            list.push(stattAttendanceList[i].dataValues)
        }
    }  
    //});

    let attributes = ['scheduledTimeIn','scheduledTimeOut','todayBreakTimeAllowedInMinutes','scheduledHours','scheduledTimeInMinutes','timeStatus','updatedTime']

    await database.bulkSave_v2(models.staffAttendance,list,attributes)



}



const calculateAttendanceDiscrepancyStatus = async (staffAttendanceDetail) => {
    let minutes = 0

    let discrepancyStatus = "onTime"
    console.log('==== >> START TIME DATA BEFORE === >> ',{discrepancyStatus})

    if( (staffAttendanceDetail.todayBreakTimeTakenInMinutes - staffAttendanceDetail.todayBreakTimeAllowedInMinutes) > 0)
    {
        console.log('==== >> BLOCK 1 === >> ',{discrepancyStatus})
        minutes += staffAttendanceDetail.todayBreakTimeTakenInMinutes - staffAttendanceDetail.todayBreakTimeAllowedInMinutes
        if(minutes>5)
        {
            discrepancyStatus = "beforeTime" 
            return {discrepancyStatus,minutes}   
        }
    }

    if( (staffAttendanceDetail.scheduledTimeInMinutes  - staffAttendanceDetail.attendedTimeInMinutes) > 0)
    {
        minutes += staffAttendanceDetail.scheduledTimeInMinutes  - staffAttendanceDetail.attendedTimeInMinutes
        if(minutes>5)
        {
            discrepancyStatus = "beforeTime" 
            return {discrepancyStatus,minutes}   
        }
    }


    let totalAttendanceTime = 0 // in hours
    let totalBreakTime = 0 // in minutes
    
    let scheduledTimeIn = staffAttendanceDetail.scheduledTimeIn
    let scheduledTimeOut = staffAttendanceDetail.scheduledTimeOut
    let allowedBreakTime = staffAttendanceDetail.todayBreakTimeAllowedInMinutes

    let timeIn = staffAttendanceDetail.timeIn
    let timeOut = staffAttendanceDetail.timeOut
    let breakTaken = staffAttendanceDetail.todayBreakTimeAllowedInMinutes

    // case 1: If timeIn > scheduledTimeIn by 5 min
    let timeInCalculation = 0
    
    let timeInHour =moment.unix(timeIn).format('HH')
    let timeInMinute =moment.unix(timeIn).format('mm')

    let scheduledTimeInHour =moment.unix(scheduledTimeIn).format('HH')
    let scheduledTimeInMinute =moment.unix(scheduledTimeIn).format('mm')

    console.log('==== >> START TIME DATA BEFORE === >> ',{discrepancyStatus})

    console.log('==== >> START TIME DATA === >> ',{timeInHour,timeInMinute,scheduledTimeInHour,scheduledTimeInMinute,discrepancyStatus})

    if(timeInHour>scheduledTimeInHour)
    {
        // 9 bje aana tha, 10 bje aaya hai
        discrepancyStatus = "beforeTime"
    } // ager hours same hain tu, check minutes
    else if(timeInHour==scheduledTimeInHour){
        if( (timeInMinute > scheduledTimeInMinute && ((timeInMinute -scheduledTimeInMinute)>0)) )
        {
            minutes += timeInMinute -scheduledTimeInMinute
            if(minutes>5)
            {
                discrepancyStatus = "beforeTime" 
                return {discrepancyStatus,minutes}   
            }
            //return {discrepancyStatus,minutes}
        }
    }
   
    
    // case 2: If timeOut > scheduledTimeIn by 5 min

    let timeOutHour =moment.unix(timeOut).format('HH')
    let timeOutMinute =moment.unix(timeOut).format('mm')

    let scheduledTimeOutHour =moment.unix(scheduledTimeOut).format('HH')
    let scheduledTimeOutMinute =moment.unix(scheduledTimeOut).format('mm')

    console.log('==== >> END TIME DATA === >> ',{timeOutHour,timeOutMinute,scheduledTimeOutHour,scheduledTimeOutMinute,discrepancyStatus})


    // if(timeOutHour<scheduledTimeOutHour)
    // {
    //     console.log('==== >> BLOCK 3 === >> ',{discrepancyStatus})
    //     // 6 bje jaana tha, 5 bje chala gaya hai
    //     discrepancyStatus = "beforeTime"
    //     return {discrepancyStatus,minutes}
    // } // ager hours same hain tu, check minutes
    if(timeOutHour<scheduledTimeOutHour){
        let timeMinutes = scheduledTimeOutMinute
        if(scheduledTimeOutMinute==0) // mtlb hour complete hai, like 6:00 (00), so changed it 60 for subtraction
        {
            timeMinutes = 60
        }
        if( (timeOutMinute < timeMinutes && ((timeMinutes - timeOutMinute)>0)) )
        {
            minutes += timeMinutes - timeOutMinute
            if(minutes>5)
            {
                discrepancyStatus = "beforeTime" 
                return {discrepancyStatus,minutes}   
            }
            // discrepancyStatus = "beforeTime"
            // return discrepancyStatus
        }
    }


    // now for afterTime

    if( (staffAttendanceDetail.attendedTimeInMinutes  - staffAttendanceDetail.scheduledTimeInMinutes) > 0)
    {
        console.log('==== >> BLOCK 1 afterTime === >> ',{discrepancyStatus})
        minutes = staffAttendanceDetail.attendedTimeInMinutes  - staffAttendanceDetail.scheduledTimeInMinutes
        discrepancyStatus = "afterTime" 
        return {discrepancyStatus,minutes}
    }

    if(timeOutHour>scheduledTimeOutHour)
    {
        // 5 bje jaana tha, 6 bje gaaya hai
        discrepancyStatus = "afterTime"

        minutes = timeOutHour - scheduledTimeOutHour
        minutes = minutes * 60
        // if sc = 10 min, and tout = 20 min
        if(timeOutMinute > scheduledTimeOutMinute)
        {
            minutes += timeOutMinute - scheduledTimeOutMinute
        }

        // if sc = 20 min, and tout = 10 min
        if(timeOutMinute > scheduledTimeOutMinute)
        {
            minutes += scheduledTimeOutMinute - timeOutMinute
        }

        return {discrepancyStatus,minutes}
    }
    else if(timeOutHour==scheduledTimeOutHour){
        if( (timeOutMinute > scheduledTimeOutMinute && ((timeOutMinute - scheduledTimeOutMinute )>5)) )
        {
            minutes = timeOutMinute - scheduledTimeOutMinute
            discrepancyStatus = "afterTime"
            return {discrepancyStatus,minutes}
        }
    }



    //console.log('==== >> BLOCK 4 end === >> ',{discrepancyStatus})


    return {discrepancyStatus,minutes}

}