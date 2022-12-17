/*******************************************************/
// Importing Files.
/*******************************************************/
const models = require("../../../database/sequelize/sequelize");
const database = require("../calls/databaseRequest");
const {manageRoomOccupancy, manageChildBookingAndSessionLog }  = require ('../../controllers/admin/child/childSessionBooking')
/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const operator = require('sequelize').Op;
const moment = require("moment")

const childFinanceDetail = require("../../../database/schemas/childFinanceDetail");

/*******************************************************/
// Cron Jobs.
/*******************************************************/

/**
 * Cron-Job: It is used to message message to the campaign particiapnts.
 */
const endChildSessionBooking = async () => {

  console.log('==== >>>   FETCH CHILD BOOKIMNG +++++++++++')


const childsBookingDetail = await database.fetch(models.childBookingDetail , {where:{
  leavingDate:{
      [operator.lt]: moment().format('YYYY-MM-DD')
  },      
} })

console.log('==== >>>  CHILD BOOKIMNG FETCHED **********')


//Mujtaba bro code
// for (let childBookingDetail of childsBookingDetail){
//   let childInfo = await database.findById(models.child, childBookingDetail.childId);
//       childInfo.activeBooking = false;
//       await database.save(childInfo);
//       let existingChildBookingSession = await database.fetch(models.childBookingSessionDetail, { where: { childId: childInfo.id } });
//       manageRoomOccupancy(childBookingDetail.roomId, existingChildBookingSession);
//       manageChildBookingAndSessionLog(childBookingDetail, existingChildBookingSession);
//       await database.remove_v2(childBookingDetail);
//       await database.bulkUpdate(models.childBookingSessionDetail, { isDeleted: 1, deletedTime: moment().unix() }, { childInfo: childId }, true);
// }

console.log('==== >>>   BEFORE LOOP ++++++')


for (let childBookingDetail of childsBookingDetail){

  console.log('==== >>>   LOOP STARTED +++++++++++')


  let childInfo = await database.findById(models.child, childBookingDetail.childId);
      if(childInfo)
      {
        // change by usman khalid for multiple bookings
        // childInfo.activeBooking = false;
        // await database.save(childInfo);
        //let existingChildBookingSession = await database.fetch(models.childBookingSessionDetail, { where: { childId: childInfo.id } });
        // usman changes for multiple bookings as above code deleted all bookings session
        let existingChildBookingSession = await database.fetch(models.childBookingSessionDetail, { where: { childId: childInfo.id,childBookingDetailId:childBookingDetail.id } });
        manageRoomOccupancy(childBookingDetail.roomId, existingChildBookingSession);
        //manageChildBookingAndSessionLog(childBookingDetail, existingChildBookingSession);
        //CHANGE BY USMAN, TO RESTORE ITS FUNDING

        const childBookingSessionDetail = await manageChildBookingAndSessionLog(childBookingDetail, existingChildBookingSession);

          console.log('=== >> childBookingSessionDetail in CRON JOB=== >> ',childBookingSessionDetail)

        let fundedHours = 0
        childBookingSessionDetail.forEach(element => {
          console.log('=== >> childBookingSessionDetail in CRON JOB=== >> ',element)
          fundedHours += element.fundedHours
        });


        // change by usman
        childBookingDetail.isDeleted = true
        childBookingDetail.deletedTime = moment().unix()
        //the reason of change
        childBookingDetail.isDeletedDueToEdit = true
        await database.save(childBookingDetail)
        
        //await database.remove_v2(childBookingDetail);
        
        await database.bulkUpdate(models.childBookingSessionDetail, { isDeleted: 1, deletedTime: moment().unix() }, { childId: childBookingDetail.childId,childBookingDetailId:childBookingDetail.id  }, true);

        // check more bookings exists or not
        let query = {
          where:{
            childId : childInfo.id
          }
        }
        const childBookings = await database.fetch(models.childBookingDetail,query)
        if(childBookings.length==0)
        {
          childInfo.activeBooking = false;
          await database.save(childInfo);
        }

        if(fundedHours>0)
        {
          let fundingWhere ={
            childId: childInfo.id
          }
          const childFinanceDetails = await database.findBy(models.childFinanceDetail,fundingWhere)
          childFinanceDetails.remainingFundedHours+=fundedHours
          await database.save(childFinanceDetails)
        }



      }
}

console.log('==== >>>   LOOP ENDED ************')


}
module.exports = {
  endChildSessionBooking
}
