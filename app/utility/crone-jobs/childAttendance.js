// /*******************************************************/
// // Importing Files.
// /*******************************************************/
// const models = require("../../../database/sequelize/sequelize");
// const database = require("../calls/databaseRequest");
// /*******************************************************/
// // Importing Npm Modules.
// /*******************************************************/
// const operator = require('sequelize').Op;
// const moment = require("moment")

// const markChildAttendance=async()=>{
//     // step 1 get previous day
//     // get all childs of current day whom attendance should be marked
//    // const date=moment().format('YYYY-MM-DD')
//     const date=moment() 
//     console.log('date is : ',date)
//     const day=date.format('dddd');
//     console.log('day is : ',day)

//     //get list of today childBookingSessionDetail
//     const childBookingSessionDetail=await childBookingSession(day)
//     // check either attendance is marked or not
//     // if not mark absent
// }

// const childBookingSession=async(day)=>{
//     // no need to run this for every branch
//     // because childBookingSessionDetail data is not branch dependent
//     let query={
//         where:{
//                 day: day
//         }
//     }
//     const childBookingSessionDetail=await database.fetch(
//         models.childBookingSessionDetail,query,
        
//         ['id','childId','childBookingDetailId','day','sessionId']
//     )
//     console.log('=====> Attendance to be marked : ',childBookingSessionDetail.length)
//     return childBookingSessionDetail;
// }

// module.exports = {
//     markChildAttendance
// }




/*******************************************************/
// Importing Files.
/*******************************************************/
const models = require("../../../database/sequelize/sequelize");
const database = require("../calls/databaseRequest");
/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const operator = require('sequelize').Op;
const moment = require("moment");
const { query } = require("express");
const childAttendance = require("../../../database/schemas/childAttendance");

const markChildAttendance=async()=>{
    // step 1 get previous day
    // get all childs of current day whom attendance should be marked

    const date=moment()
    console.log('date is : ',date)
    const day=date.format('dddd');
    console.log('day is : ',day)

    // get all branches
    const brahces= await database.fetch(models.branch,{})
    //console.log(brahces)
    let chk=0
    let startDate=moment().format('YYYY-MM-DD')

    // check is it holiday or not
    for(let v of brahces)
    {
        // check holiday or not
        const branchEventHolidays = await database.fetch(models.calendar, {where: {
            branchId: v.dataValues.id ,   
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
            // means no holiday
           // console.log('branchEventHolidays',branchEventHolidays)
            const branchSessions=await database.fetch(
                models.session,
                {where:{branchId: v.dataValues.id}}
            )
            for(let v1 of branchSessions)
            {
                //console.log('BRACH ALL SESSIONS ARE : ',v1.dataValues)
                 //get list of today childBookingSessionDetail
                if(v1!=null)
                {
                    const childBookingSessionDetail=await childBookingSession(day,v1)
                    // get room id
                    if(childBookingSessionDetail.length>0)
                    {
                        const childDetailList=[]
                        // get data from childBooking detail because could be multiple sessions

                        for(let v of childBookingSessionDetail)
                        {
                            const result=await getChildBookingDetail(v)
                            if(result)
                            {
                                childDetailList.push({
                                    childId: result.childId,
                                    branchId: result.branchId,
                                    roomId: result.roomId,
                                    sessionId: v.sessionId
                                })
                            }
                        }

                        // check either attendance is marked or not
                        // if not mark absent
                        await isAttendanceMarked(childDetailList)
                    }
                }
            }
        }
       
            

            //console.log('SESSIONS OF BRANCH : ',branchSessions)

    }
 

    

    // //get list of today childBookingSessionDetail
    // const childBookingSessionDetail=await childBookingSession(day)
    // // get room id
    // const childDetailList=[]
    // // get data from childBooking detail because could be multiple sessions

    // for(let v of childBookingSessionDetail)
    // {
    //     const result=await getChildBookingDetail(v)
    //     if(result)
    //     {
    //         childDetailList.push({
    //             childId: result.childId,
    //             branchId: result.branchId,
    //             roomId: result.roomId,
    //             sessionId: v.sessionId
    //         })
    //     }
    // }

    // // check either attendance is marked or not
    // // if not mark absent
    // await isAttendanceMarked(childDetailList)
}
const childBookingSession=async(day,v1)=>{
    const childBookingSessionDetails=await database.fetchWithSorting(
        models.childBookingSessionDetail,
            { where: { day: day,sessionId:v1.dataValues.id } },
            ['id','childId','childBookingDetailId','day','sessionId']
    )
    if(childBookingSessionDetails.length>0)
    {
        console.log('=====> Attendance to be marked : ',childBookingSessionDetails.length)
    }
    return childBookingSessionDetails;
}

const isAttendanceMarked=async(childDetailList)=>{
    
    for(let v of childDetailList)
    {
            const result= await getAttendance(v);
            if(!result)
            {
                await markAttendance(v.childId,v.branchId,v.roomId,v.sessionId)
            }
    }
}

let count=0
const markAttendance=async(childId,branchId,roomId,sessionId)=>{
    // number of absent is less because data is not unique
    console.log('========= NUMBER OF ENTERIES =========== ',++count)
    const date=moment().format('YYYY-MM-DD')
    const data= new models.childAttendance({})
    data.childId=childId
    data.branchId=branchId
    data.roomId=roomId
    data.sessionId=sessionId
    data.attendance='absent'
    data.createdDate=date
    await database.save(data)
}

const getChildBookingDetail=async(element)=>{
    const result= await database.findBy(
        models.childBookingDetail,
        {
            childId : element.childId
        }
    )
    return result
}

const getAttendance=async(element)=>{
    let createdDate =moment(moment().unix() * 1000).format('YYYY-MM-DD')
    const result= await database.findBy(
        models.childAttendance,
        {
            childId: element.childId,
            branchId: element.branchId,
            roomId: element.roomId,
            sessionId: element.sessionId,
            createdDate: createdDate
        }
    );
    return result
}


const markChildAttendanceDiscrepancy=async()=>{

    // fetch today attendance  
    const todayDate = moment().format('YYYY-MM-DD') 
    let query = {
        where:{
            createdDate: todayDate,
            timeOut: 0,
            // timeStatus: {
            //     [operator.ne]: 'afterTime'
            // }
        }
    }
    const todayAttendance = await database.fetch(models.childAttendance,query)

    todayAttendance.forEach(async childAttendance => {
        
        let childId = childAttendance.chidlId

        await calculateAttendance(childAttendance)

    });



}

const calculateAttendance=async(attendance)=>{
    // get childId and its today session
    const day = moment().format('dddd'); 
    let query = {
        where:{
            childId : attendance.childId,
            day : day,
            startTime:{
                [operator.gt]:0
            }
        }
    }
    const todaySessionDetails = await database.fetch(models.childBookingSessionDetail,query)
    if(todaySessionDetails.length>0)
    {
        let totalTodayTime = 0;
        let startTime = todaySessionDetails[0].startTime
        let endTime = todaySessionDetails[0].endTime
        console.log('END TIME : ',endTime)
        // it will give the max endTime of today's sessions
        for(let i=0;i<todaySessionDetails.length;i++)
        {
            if(moment.unix(todaySessionDetails[i].startTime).format('HH')<moment.unix(startTime).format('HH'))
            {
                startTime = todaySessionDetails[i].startTime
            }

            if(moment.unix(todaySessionDetails[i].endTime).format('HH')>moment.unix(endTime).format('HH'))
            {
                endTime = todaySessionDetails[i].endTime
            }
        }
        totalTodayTime =  endTime - startTime
        let sessionHours = moment.unix(endTime).format('HH')
        let sessionMinutes = moment.unix(endTime).format('mm')

        let currentTimeHours = moment().format('HH')
        let currentTimeMinutes = moment().format('mm')
        let isTimeUp = false
        if(currentTimeHours==sessionHours)
        {
            if( (currentTimeMinutes- sessionMinutes)>15)
            {
                isTimeUp = true
            }
        }
        else if(currentTimeHours > sessionHours)
        {
            isTimeUp = true
        }
        if(attendance.timeOut==0 && isTimeUp)
        {
            attendance.timeStatus = 'afterTime';
        }
    }
    else
    {
        attendance.timeStatus = 'afterTime';
        attendance.isBookedDay = false
    }
    return await database.save(attendance)
 }


module.exports = {
    markChildAttendance,
    markChildAttendanceDiscrepancy
}