/*******************************************************/
// Importing Files.
/*******************************************************/
const models = require("../../../database/sequelize/sequelize");
const database = require("../calls/databaseRequest");
const lodash = require("../functions/lodash")
/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const operator = require('sequelize').Op;
const moment = require("moment")

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
    let counter=0;

    // check is it holiday or not

    // get all attendance of today regards less of branch so we can use that array in our entire process for subtraction

    const getTodayAttendance = await getAttendance();
    let studentToBeMarked=[];
    //array changed into variable
    //let absentChilds=[]
    let absentChilds;
    for(let v of brahces)
    {
        // check holiday or not
        const branchEventHolidays = await getBranchHolidays(v);
        if(branchEventHolidays.length==0)
        {
            // means no holiday
            // if not holiday than
            // fetch all those students whose joinDate<today && leavingDate is null or leavingDate<=today

            // final where clause must be

            let where={
                branchId: v.dataValues.id,
                status: true, isDeleted: false ,
                [operator.and]:[
                    {
                        joiningDate:{
                           [operator.lte]:moment().format('YYYY-MM-DD')
                        }
                    },
                    {
                        [operator.or]: [
                            {
                                leavingDate: {
                                    [operator.gte]: moment().format('YYYY-MM-DD')
                                },
                            },
                            {
                                leavingDate: { [operator.eq]: null }
                            },
    
                        ]
                    }
                ]
            }
        
            // get child those who have active Booking according to branchId
            let result;
            // also have to subtract day from scope
            result = await database.fetchWithScope(models.child, [{ method: ['childActive', where] }],{});
            
            console.log('In condition',v.dataValues.id)
            // outer loof as result is an array
            if(result.length>0)
            {
                // make list of students to be marked
                result.forEach(element => {
                    
                    let childId = element.dataValues.id
                    let roomId = element.dataValues.roomId
                    let branchId = element.dataValues.branchId
                    // session Could be multiple
                    let sessionId;

                    for(let i of element.childBookingDetail.childBookingSessions)
                    {
                        sessionId = i.dataValues.sessionId
                        studentToBeMarked.push(
                            {
                                childId : childId,
                                branchId : branchId,
                                roomId : roomId,
                                sessionId : sessionId,
                                attendance : 'absent',
                                createdDate: moment().format('YYYY-MM-DD'),
                                createdTime : moment().unix(),
                                updatedTime : moment().unix(), 
                            }
                        )

                    }


                    

                });


                console.log('getTodayAttendance',getTodayAttendance.length)
                console.log('studentToBeMarked',studentToBeMarked.length)

                // absentChilds=lodash.difference(getTodayAttendance,studentToBeMarked)

                console.log('=======')
                console.log('=======')


                console.log(getTodayAttendance.length>0)
                console.log(studentToBeMarked.length > getTodayAttendance.length)
                console.log(getTodayAttendance.length==studentToBeMarked.length)


                if(getTodayAttendance.length>0 && getTodayAttendance.length >= studentToBeMarked.length)
                {
                    absentChilds = getTodayAttendance.filter(({ value: id1 }) => !studentToBeMarked.some(({ value: id2 }) => id2 === id1));
                }
                else if(getTodayAttendance.length>0 && getTodayAttendance.length < studentToBeMarked.length)
                {
                    absentChilds = studentToBeMarked.filter(({ value: id1 }) => !getTodayAttendance.some(({ value: id2 }) => id2 === id1));
                }
                else
                {
                    absentChilds = studentToBeMarked
                }

                // list of students whose data is not in attendance table
                // manually comparing
                //console.log('studentToBeMarked',studentToBeMarked)
                

                // Old Code
                // if(getTodayAttendance>0 && getTodayAttendance.length >= studentToBeMarked.length)
                // {
                //     console.log('In if condition')

                //     console.log('here')
                //     for(let i of getTodayAttendance)
                //     {
                //         for(let j of studentToBeMarked)
                //         {
                //             if( i.dataValues.childId != j.childId && i.dataValues.branchId != j.branchId && i.dataValues.sessionId != j.sessionId && i.dataValues.roomId != j.roomId)
                //             {
                //                 absentChilds.push(
                //                     {
                //                         childId : i.childId,
                //                         roomId : i.roomId,
                //                         branchId : i.branchId,
                //                         sessionId : i.sessionId,
                //                         attendance : 'absent',
                //                         createdDate: moment().format('YYYY-MM-DD'),
                //                         createdTime : moment().unix(),
                //                         updatedTime : moment().unix(), 
                //                     }
                //                 )
                //             }
                //         }
                //     }
                // }
                // else if( (getTodayAttendance>0) && 
                //     (studentToBeMarked.length > getTodayAttendance.length) )
                // {
                //     console.log('In else condition')

                //     console.log('else')
                //     for(let i of studentToBeMarked)
                //     {
                //         for(let j of getTodayAttendance)
                //         {
                //             if(i.childId!=j.dataValues.childId && i.branchId!=j.dataValues.branchId && i.sessionId!=j.dataValues.sessionId && i.roomId!=j.dataValues.roomId)
                //             {
                //                 absentChilds.push(
                //                     {
                //                         childId : i.childId,
                //                         roomId : i.roomId,
                //                         branchId : i.branchId,
                //                         sessionId : i.sessionId,
                //                         attendance : 'absent',
                //                         createdDate: moment().format('YYYY-MM-DD'),
                //                         createdTime : moment().unix(),
                //                         updatedTime : moment().unix(),  
                //                     }
                //                 )
                //             }
                //         }
                //     }
                // }
                // //else if(getTodayAttendance.length == 0 && studentToBeMarked > 0 )
                // else if(getTodayAttendance.length==0)
                // {
                //     console.log('In outer else condition')

                //     console.log('getTodayAttendance.length==0')
                //     absentChilds = studentToBeMarked
                // }
                // else if(absentChilds.length>0)
                // {
                //     //console.log(studentToBeMarked.length)
                //     //console.log(absentChilds.length)

                //     console.log('End else')
                //     absentChilds = studentToBeMarked
                // }

                //console.log('absent',absentChilds)

                
                console.log('absentChilds Length',absentChilds.length)

                console.log('absentChilds',absentChilds)
                if(absentChilds.length>0)
                {
                    await markAbsent(absentChilds)
                }


            }

            console.log('==============================================')
            
            console.log('==============================================')
            

            
        }

    }

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

const getAttendance=async()=>{
    // let createdDate =moment(moment().unix() * 1000).format('YYYY-MM-DD')
    // const result= await database.findBy(
    //     models.childAttendance,
    //     {
    //         childId: element.childId,
    //         branchId: element.branchId,
    //         roomId: element.roomId,
    //         sessionId: element.sessionId,
    //         createdDate: createdDate
    //     }
    // );
    let createdDate =moment(moment().unix() * 1000).format('YYYY-MM-DD')
    const result= await database.fetch(models.childAttendance,{
        where:{
            createdDate: createdDate
        },
        
        // we will add attributes later
    })
    console.log('Today Attendance : ',result)
    
    return result
}

const getBranchHolidays= async(v)=>{
    const startDate=moment().format('YYYY-MM-DD')
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

    return branchEventHolidays;
}

const markAbsent = async(childList)=>{
    await database.bulkSave(models.childAttendance,childList)
}



module.exports = {
    markChildAttendance
}