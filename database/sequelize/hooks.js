/*******************************************************/
// Importing Files.
/*******************************************************/
const database = require("../.././app/utility/calls/databaseRequest");
/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const moment = require("moment");
const operator = require("sequelize").Op;
const { LexRuntime } = require("aws-sdk");
const { session } = require("passport");

/*******************************************************/
// Implementing Hooks.
/*******************************************************/

module.exports = function (model) {
    /***
     * 
     * HOOK:  AFTER CREATING ROOM. 
     * 
     */
    model.room.addHook('afterCreate', (instance) => {
        // const roomOccupancy = [
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: "08:00",
        //         endTime: "9:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: "9:00",
        //         endTime: "10:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: "10:00",
        //         endTime: "11:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: "11:00",
        //         endTime: "12:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: "12:00",
        //         endTime: "13:00"
        //     }, {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: "13:00",
        //         endTime: "14:00"
        //     }, {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: "14:00",
        //         endTime: "15:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: "15:00",
        //         endTime: "16:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: "16:00",
        //         endTime: "17:00"
        //     }
        //     , {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: "17:00",
        //         endTime: "18:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: "18:00",
        //         endTime: "19:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: "08:00",
        //         endTime: "9:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: "9:00",
        //         endTime: "10:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: "10:00",
        //         endTime: "11:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: "11:00",
        //         endTime: "12:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: "12:00",
        //         endTime: "13:00"
        //     }, {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: "13:00",
        //         endTime: "14:00"
        //     }, {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: "14:00",
        //         endTime: "15:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: "15:00",
        //         endTime: "16:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: "16:00",
        //         endTime: "17:00"
        //     }
        //     , {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: "17:00",
        //         endTime: "18:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: "18:00",
        //         endTime: "19:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: "8:00",
        //         endTime: "9:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: "9:00",
        //         endTime: "10:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: "10:00",
        //         endTime: "11:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: "11:00",
        //         endTime: "12:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: "12:00",
        //         endTime: "13:00"
        //     }, {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: "13:00",
        //         endTime: "14:00"
        //     }, {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: "14:00",
        //         endTime: "15:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: "15:00",
        //         endTime: "16:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: "16:00",
        //         endTime: "17:00"
        //     }
        //     , {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: "17:00",
        //         endTime: "18:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: "18:00",
        //         endTime: "19:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: "08:00",
        //         endTime: "9:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: "9:00",
        //         endTime: "10:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: "10:00",
        //         endTime: "11:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: "11:00",
        //         endTime: "12:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: "12:00",
        //         endTime: "13:00"
        //     }, {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: "13:00",
        //         endTime: "14:00"
        //     }, {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: "14:00",
        //         endTime: "15:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: "15:00",
        //         endTime: "16:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: "16:00",
        //         endTime: "17:00"
        //     }
        //     , {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: "17:00",
        //         endTime: "18:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: "18:00",
        //         endTime: "19:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: "08:00",
        //         endTime: "9:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: "9:00",
        //         endTime: "10:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: "10:00",
        //         endTime: "11:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: "11:00",
        //         endTime: "12:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: "12:00",
        //         endTime: "13:00"
        //     }, {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: "13:00",
        //         endTime: "14:00"
        //     }, {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: "14:00",
        //         endTime: "15:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: "15:00",
        //         endTime: "16:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: "16:00",
        //         endTime: "17:00"
        //     }
        //     , {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: "17:00",
        //         endTime: "18:00"
        //     },
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: "18:00",
        //         endTime: "19:00"
        //     }
        // ]


        // const roomOccupancy = [
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: 1638327600,
        //         endTime: 1638331200
        //     }, //8-9
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: 1638331200,
        //         endTime: 1638334800
        //     },//9-10
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: 1638334800,
        //         endTime: 1638338400
        //     }, //10-11
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: 1638338400,
        //         endTime: 1638342000
        //     }, //11-12
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: 1638342000,
        //         endTime: 1638345600
        //     }, // 12=1
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: 1638345600,
        //         endTime: 1638349200
        //     }, // 1=2
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: 1638349200,
        //         endTime: 1638352800
        //     }, // 2=3
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: 1638352800,
        //         endTime: 1638356400
        //     }, // 3=4
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: 1638356400,
        //         endTime: 1638360000
        //     }, // 4=5
        //     {
        //         roomId: instance.id,
        //         day: "monday",
        //         startTime: 1638360000,
        //         endTime: 1638363600
        //     }, // 5=6
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: 1638327600,
        //         endTime: 1638331200
        //     }, //8-9
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: 1638331200,
        //         endTime: 1638334800
        //     },//9-10
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: 1638334800,
        //         endTime: 1638338400
        //     }, //10-11
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: 1638338400,
        //         endTime: 1638342000
        //     }, //11-12
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: 1638342000,
        //         endTime: 1638345600
        //     }, // 12=1
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: 1638345600,
        //         endTime: 1638349200
        //     }, // 1=2
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: 1638349200,
        //         endTime: 1638352800
        //     }, // 2=3
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: 1638352800,
        //         endTime: 1638356400
        //     }, // 3=4
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: 1638356400,
        //         endTime: 1638360000
        //     }, // 4=5
        //     {
        //         roomId: instance.id,
        //         day: "tuesday",
        //         startTime: 1638360000,
        //         endTime: 1638363600
        //     }, // 5=6
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: 1638327600,
        //         endTime: 1638331200
        //     }, //8-9
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: 1638331200,
        //         endTime: 1638334800
        //     },//9-10
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: 1638334800,
        //         endTime: 1638338400
        //     }, //10-11
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: 1638338400,
        //         endTime: 1638342000
        //     }, //11-12
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: 1638342000,
        //         endTime: 1638345600
        //     }, // 12=1
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: 1638345600,
        //         endTime: 1638349200
        //     }, // 1=2
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: 1638349200,
        //         endTime: 1638352800
        //     }, // 2=3
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: 1638352800,
        //         endTime: 1638356400
        //     }, // 3=4
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: 1638356400,
        //         endTime: 1638360000
        //     }, // 4=5
        //     {
        //         roomId: instance.id,
        //         day: "wednesday",
        //         startTime: 1638360000,
        //         endTime: 1638363600
        //     }, // 5=6
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: 1638327600,
        //         endTime: 1638331200
        //     }, //8-9
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: 1638331200,
        //         endTime: 1638334800
        //     },//9-10
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: 1638334800,
        //         endTime: 1638338400
        //     }, //10-11
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: 1638338400,
        //         endTime: 1638342000
        //     }, //11-12
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: 1638342000,
        //         endTime: 1638345600
        //     }, // 12=1
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: 1638345600,
        //         endTime: 1638349200
        //     }, // 1=2
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: 1638349200,
        //         endTime: 1638352800
        //     }, // 2=3
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: 1638352800,
        //         endTime: 1638356400
        //     }, // 3=4
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: 1638356400,
        //         endTime: 1638360000
        //     }, // 4=5
        //     {
        //         roomId: instance.id,
        //         day: "thursday",
        //         startTime: 1638360000,
        //         endTime: 1638363600
        //     }, // 5=6
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: 1638327600,
        //         endTime: 1638331200
        //     }, //8-9
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: 1638331200,
        //         endTime: 1638334800
        //     },//9-10
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: 1638334800,
        //         endTime: 1638338400
        //     }, //10-11
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: 1638338400,
        //         endTime: 1638342000
        //     }, //11-12
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: 1638342000,
        //         endTime: 1638345600
        //     }, // 12=1
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: 1638345600,
        //         endTime: 1638349200
        //     }, // 1=2
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: 1638349200,
        //         endTime: 1638352800
        //     }, // 2=3
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: 1638352800,
        //         endTime: 1638356400
        //     }, // 3=4
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: 1638356400,
        //         endTime: 1638360000
        //     }, // 4=5
        //     {
        //         roomId: instance.id,
        //         day: "friday",
        //         startTime: 1638360000,
        //         endTime: 1638363600
        //     }, // 5=6
            
        // ]




        // change by usman khalid as the upper time in 9 digits and our whole project is running of 10 digits time
    //     const roomOccupancy =   [
    //         {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 946695600,
    //         endTime: 946699200
    //     }, //8-9
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 946699200,
    //         endTime: 946702800
    //     },//9-10
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 946702800,
    //         endTime: 946706400
    //     }, //10-11
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 946706400,
    //         endTime: 946710000
    //     }, //11-12
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 946710000,
    //         endTime: 946713600
    //     }, // 12=1
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 946713600,
    //         endTime: 946717200
    //     }, // 1=2
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 946717200,
    //         endTime: 946720800
    //     }, // 2=3
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 946720800,
    //         endTime: 946724400
    //     }, // 3=4
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 946724400,
    //         endTime: 946728000
    //     }, // 4=5
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 946728000,
    //         endTime: 946731600
    //     }, // 5=6
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 946695600,
    //         endTime: 946699200
    //     }, //8-9
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 946699200,
    //         endTime: 946702800
    //     },//9-10
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 946702800,
    //         endTime: 946706400
    //     }, //10-11
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 946706400,
    //         endTime: 946710000
    //     }, //11-12
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 946710000,
    //         endTime: 946713600
    //     }, // 12=1
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 946713600,
    //         endTime: 946717200
    //     }, // 1=2
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 946717200,
    //         endTime: 946720800
    //     }, // 2=3
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 946720800,
    //         endTime: 946724400
    //     }, // 3=4
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 946724400,
    //         endTime: 946728000
    //     }, // 4=5
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 946728000,
    //         endTime: 946731600
    //     }, // 5=6
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 946695600,
    //         endTime: 946699200
    //     }, //8-9
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 946699200,
    //         endTime: 946702800
    //     },//9-10
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 946702800,
    //         endTime: 946706400
    //     }, //10-11
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 946706400,
    //         endTime: 946710000
    //     }, //11-12
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 946710000,
    //         endTime: 946713600
    //     }, // 12=1
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 946713600,
    //         endTime: 946717200
    //     }, // 1=2
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 946717200,
    //         endTime: 946720800
    //     }, // 2=3
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 946720800,
    //         endTime: 946724400
    //     }, // 3=4
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 946724400,
    //         endTime: 946728000
    //     }, // 4=5
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 946728000,
    //         endTime: 946731600
    //     }, // 5=6
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 946695600,
    //         endTime: 946699200
    //     }, //8-9
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 946699200,
    //         endTime: 946702800
    //     },//9-10
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 946702800,
    //         endTime: 946706400
    //     }, //10-11
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 946706400,
    //         endTime: 946710000
    //     }, //11-12
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 946710000,
    //         endTime: 946713600
    //     }, // 12=1
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 946713600,
    //         endTime: 946717200
    //     }, // 1=2
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 946717200,
    //         endTime: 946720800
    //     }, // 2=3
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 946720800,
    //         endTime: 946724400
    //     }, // 3=4
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 946724400,
    //         endTime: 946728000
    //     }, // 4=5
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 946728000,
    //         endTime: 946731600
    //     }, // 5=6
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 946695600,
    //         endTime: 946699200
    //     }, //8-9
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 946699200,
    //         endTime: 946702800
    //     },//9-10
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 946702800,
    //         endTime: 946706400
    //     }, //10-11
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 946706400,
    //         endTime: 946710000
    //     }, //11-12
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 946710000,
    //         endTime: 946713600
    //     }, // 12=1
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 946713600,
    //         endTime: 946717200
    //     }, // 1=2
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 946717200,
    //         endTime: 946720800
    //     }, // 2=3
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 946720800,
    //         endTime: 946724400
    //     }, // 3=4
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 946724400,
    //         endTime: 946728000
    //     }, // 4=5
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 946728000,
    //         endTime: 946731600
    //     }, // 5=6
    // ]


        // change by usman khalid as the upper time in 9 digits and our whole project is running of 10 digits time
        // GMT
    //     const roomOccupancy =   [
    //         {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 1578124800,
    //         endTime: 1578128400
    //     }, //8-9
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 1578128400,
    //         endTime: 1578132000
    //     },//9-10
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 1578132000,
    //         endTime: 1578135600
    //     }, //10-11
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 1578135600,
    //         endTime: 1578139200
    //     }, //11-12
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 1578139200,
    //         endTime: 1578142800
    //     }, // 12=1
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 1578142800,
    //         endTime: 1578146400
    //     }, // 1=2
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 1578146400,
    //         endTime: 1578150000
    //     }, // 2=3
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 1578150000,
    //         endTime: 1578153600
    //     }, // 3=4
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 1578153600,
    //         endTime: 1578157200
    //     }, // 4=5
    //     {
    //         roomId: instance.id,
    //         day: "monday",
    //         startTime: 1578157200,
    //         endTime: 1578160800
    //     }, // 5=6
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 1578211200,
    //         endTime: 1578214800
    //     }, //8-9
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 1578214800,
    //         endTime: 1578218400
    //     },//9-10
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 1578218400,
    //         endTime: 1578222000
    //     }, //10-11
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 1578222000,
    //         endTime: 1578225600
    //     }, //11-12
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 1578225600,
    //         endTime: 1578229200
    //     }, // 12=1
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 1578229200,
    //         endTime: 1578232800
    //     }, // 1=2
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 1578232800,
    //         endTime: 1578236400
    //     }, // 2=3
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 1578236400,
    //         endTime: 1578240000
    //     }, // 3=4
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 1578240000,
    //         endTime: 1578243600
    //     }, // 4=5
    //     {
    //         roomId: instance.id,
    //         day: "tuesday",
    //         startTime: 1578243600,
    //         endTime: 1578247200
    //     }, // 5=6
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 1578297600,
    //         endTime: 1578301200
    //     }, //8-9
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 1578301200,
    //         endTime: 1578304800
    //     },//9-10
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 1578304800,
    //         endTime: 1578308400
    //     }, //10-11
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 1578308400,
    //         endTime: 1578312000
    //     }, //11-12
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 1578312000,
    //         endTime: 1578315600
    //     }, // 12=1
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 1578315600,
    //         endTime: 1578319200
    //     }, // 1=2
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 1578319200,
    //         endTime: 1578322800
    //     }, // 2=3
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 1578322800,
    //         endTime: 1578326400
    //     }, // 3=4
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 1578326400,
    //         endTime: 1578330000
    //     }, // 4=5
    //     {
    //         roomId: instance.id,
    //         day: "wednesday",
    //         startTime: 1578330000,
    //         endTime: 1578333600
    //     }, // 5=6
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 1578384000,
    //         endTime: 1578387600
    //     }, //8-9
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 1578387600,
    //         endTime: 1578391200
    //     },//9-10
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 1578391200,
    //         endTime: 1578394800
    //     }, //10-11
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 1578394800,
    //         endTime: 1578398400
    //     }, //11-12
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 1578398400,
    //         endTime: 1578402000
    //     }, // 12=1
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 1578402000,
    //         endTime: 1578405600
    //     }, // 1=2
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 1578405600,
    //         endTime: 1578409200
    //     }, // 2=3
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 1578409200,
    //         endTime: 1578412800
    //     }, // 3=4
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 1578412800,
    //         endTime: 1578416400
    //     }, // 4=5
    //     {
    //         roomId: instance.id,
    //         day: "thursday",
    //         startTime: 1578416400,
    //         endTime: 1578420000
    //     }, // 5=6
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 1578470400,
    //         endTime: 1578474000
    //     }, //8-9
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 1578474000,
    //         endTime: 1578477600
    //     },//9-10
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 1578477600,
    //         endTime: 1578481200
    //     }, //10-11
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 1578481200,
    //         endTime: 1578484800
    //     }, //11-12
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 1578484800,
    //         endTime: 1578488400
    //     }, // 12=1
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 1578488400,
    //         endTime: 1578492000
    //     }, // 1=2
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 1578492000,
    //         endTime: 1578495600
    //     }, // 2=3
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 1578495600,
    //         endTime: 1578499200
    //     }, // 3=4
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 1578499200,
    //         endTime: 1578502800
    //     }, // 4=5
    //     {
    //         roomId: instance.id,
    //         day: "friday",
    //         startTime: 1578502800,
    //         endTime: 1578506400
    //     }, // 5=6
    // ]

// local time

    const roomOccupancy =   [
        {
        roomId: instance.id,
        day: "monday",
        startTime: 1638586800,
        endTime: 1638590400
    }, //8-9
    {
        roomId: instance.id,
        day: "monday",
        startTime: 1638590400,
        endTime: 1638594000
    },//9-10
    {
        roomId: instance.id,
        day: "monday",
        startTime: 1638594000,
        endTime: 1638597600
    }, //10-11
    {
        roomId: instance.id,
        day: "monday",
        startTime: 1638597600,
        endTime: 1638601200
    }, //11-12
    {
        roomId: instance.id,
        day: "monday",
        startTime: 1638601200,
        endTime: 1638604800
    }, // 12=1
    {
        roomId: instance.id,
        day: "monday",
        startTime: 1638604800,
        endTime: 1638608400
    }, // 1=2
    {
        roomId: instance.id,
        day: "monday",
        startTime: 1638608400,
        endTime: 1638612000
    }, // 2=3
    {
        roomId: instance.id,
        day: "monday",
        startTime: 1638612000,
        endTime: 1638615600
    }, // 3=4
    {
        roomId: instance.id,
        day: "monday",
        startTime: 1638615600,
        endTime: 1638619200
    }, // 4=5
    {
        roomId: instance.id,
        day: "monday",
        startTime: 1638619200,
        endTime: 1638622800
    }, // 5=6

    // tuesday


    {
        roomId: instance.id,
        day: "tuesday",
        startTime: 1638586800,
        endTime: 1638590400
    }, //8-9
    {
        roomId: instance.id,
        day: "tuesday",
        startTime: 1638590400,
        endTime: 1638594000
    },//9-10
    {
        roomId: instance.id,
        day: "tuesday",
        startTime: 1638594000,
        endTime: 1638597600
    }, //10-11
    {
        roomId: instance.id,
        day: "tuesday",
        startTime: 1638597600,
        endTime: 1638601200
    }, //11-12
    {
        roomId: instance.id,
        day: "tuesday",
        startTime: 1638601200,
        endTime: 1638604800
    }, // 12=1
    {
        roomId: instance.id,
        day: "tuesday",
        startTime: 1638604800,
        endTime: 1638608400
    }, // 1=2
    {
        roomId: instance.id,
        day: "tuesday",
        startTime: 1638608400,
        endTime: 1638612000
    }, // 2=3
    {
        roomId: instance.id,
        day: "tuesday",
        startTime: 1638612000,
        endTime: 1638615600
    }, // 3=4
    {
        roomId: instance.id,
        day: "tuesday",
        startTime: 1638615600,
        endTime: 1638619200
    }, // 4=5
    {
        roomId: instance.id,
        day: "tuesday",
        startTime: 1638619200,
        endTime: 1638622800
    }, // 5=6


    //wednesday
    {
        roomId: instance.id,
        day: "wednesday",
        startTime: 1638586800,
        endTime: 1638590400
    }, //8-9
    {
        roomId: instance.id,
        day: "wednesday",
        startTime: 1638590400,
        endTime: 1638594000
    },//9-10
    {
        roomId: instance.id,
        day: "wednesday",
        startTime: 1638594000,
        endTime: 1638597600
    }, //10-11
    {
        roomId: instance.id,
        day: "wednesday",
        startTime: 1638597600,
        endTime: 1638601200
    }, //11-12
    {
        roomId: instance.id,
        day: "wednesday",
        startTime: 1638601200,
        endTime: 1638604800
    }, // 12=1
    {
        roomId: instance.id,
        day: "wednesday",
        startTime: 1638604800,
        endTime: 1638608400
    }, // 1=2
    {
        roomId: instance.id,
        day: "wednesday",
        startTime: 1638608400,
        endTime: 1638612000
    }, // 2=3
    {
        roomId: instance.id,
        day: "wednesday",
        startTime: 1638612000,
        endTime: 1638615600
    }, // 3=4
    {
        roomId: instance.id,
        day: "wednesday",
        startTime: 1638615600,
        endTime: 1638619200
    }, // 4=5
    {
        roomId: instance.id,
        day: "wednesday",
        startTime: 1638619200,
        endTime: 1638622800
    }, // 5=6


    //thursday
    {
        roomId: instance.id,
        day: "thursday",
        startTime: 1638586800,
        endTime: 1638590400
    }, //8-9
    {
        roomId: instance.id,
        day: "thursday",
        startTime: 1638590400,
        endTime: 1638594000
    },//9-10
    {
        roomId: instance.id,
        day: "thursday",
        startTime: 1638594000,
        endTime: 1638597600
    }, //10-11
    {
        roomId: instance.id,
        day: "thursday",
        startTime: 1638597600,
        endTime: 1638601200
    }, //11-12
    {
        roomId: instance.id,
        day: "thursday",
        startTime: 1638601200,
        endTime: 1638604800
    }, // 12=1
    {
        roomId: instance.id,
        day: "thursday",
        startTime: 1638604800,
        endTime: 1638608400
    }, // 1=2
    {
        roomId: instance.id,
        day: "thursday",
        startTime: 1638608400,
        endTime: 1638612000
    }, // 2=3
    {
        roomId: instance.id,
        day: "thursday",
        startTime: 1638612000,
        endTime: 1638615600
    }, // 3=4
    {
        roomId: instance.id,
        day: "thursday",
        startTime: 1638615600,
        endTime: 1638619200
    }, // 4=5
    {
        roomId: instance.id,
        day: "thursday",
        startTime: 1638619200,
        endTime: 1638622800
    }, // 5=6


    //friday
    {
        roomId: instance.id,
        day: "friday",
        startTime: 1638586800,
        endTime: 1638590400
    }, //8-9
    {
        roomId: instance.id,
        day: "friday",
        startTime: 1638590400,
        endTime: 1638594000
    },//9-10
    {
        roomId: instance.id,
        day: "friday",
        startTime: 1638594000,
        endTime: 1638597600
    }, //10-11
    {
        roomId: instance.id,
        day: "friday",
        startTime: 1638597600,
        endTime: 1638601200
    }, //11-12
    {
        roomId: instance.id,
        day: "friday",
        startTime: 1638601200,
        endTime: 1638604800
    }, // 12=1
    {
        roomId: instance.id,
        day: "friday",
        startTime: 1638604800,
        endTime: 1638608400
    }, // 1=2
    {
        roomId: instance.id,
        day: "friday",
        startTime: 1638608400,
        endTime: 1638612000
    }, // 2=3
    {
        roomId: instance.id,
        day: "friday",
        startTime: 1638612000,
        endTime: 1638615600
    }, // 3=4
    {
        roomId: instance.id,
        day: "friday",
        startTime: 1638615600,
        endTime: 1638619200
    }, // 4=5
    {
        roomId: instance.id,
        day: "friday",
        startTime: 1638619200,
        endTime: 1638622800
    }, // 5=6
]



        database.bulkSave(model.roomPerHourPerDayOccupancy, roomOccupancy);
        console.log("hey !");
    });

    /***
     * 
     *  HOOK: AFTER BULK CREATING CHILD BOOKING SESSION. 
     * 
     */
    //  model.childBookingSessionDetail.addHook('afterBulkCreate', async (instance) => {
    //     console.log("***----------------------****")
    //     console.log("***----------------------****")
    //     console.log("***----------------------****")
    //     console.log("***----------------------****")
    //     let childBookingDetail = await database.findBy(model.childBookingDetail, { childId: instance[0].childId })
    //     //have to get session pricing over here session.sessionId
    //     // const sessionDetail = await database.findById(model.sessionPricing,session.sessionId)
    //     // const sessionPrice = await database.findBy(model.sessionPricing,{sessionId : session.sessionId})
    //     // let sessionTime = (sessionDetail.endTime - sessionDetail.startTime)/60 //time in seconds
    //     // sessionTime = sessionTime/60 // time in hours
    
    //     for (let session of instance) {
    //         console.log("session",session)
    //         console.log("-----------_____________########____________--------------")
    //         console.log("-----------_____________########____________--------------")
    //         console.log("-----------_____________########____________--------------")
    //         console.log("-----------_____________########____________--------------")
    //         let startTime = 0, endTime = 0;
    //         if (session.startTime > 0 && session.endTime > 0) {
    //             // startTime = moment(Number(session.startTime * 1000)).format("HH:mm:ss");
    //             // endTime = moment(Number(session.endTime * 1000)).format("HH:mm:ss");
    //             console.log("startTime",startTime)
    //             console.log("endTime",endTime)
        
    //             let query = {
    //                 where: {
    //                     day: session.day,
    //                     roomId: childBookingDetail.roomId,
    //                     [operator.and]: [
    //                         {
    //                             startTime: {
    //                                 [operator.gte]: session.startTime
    //                             }
    //                         },
    //                         {
    //                             endTime: {
    //                                 [operator.lte]: session.endTime
    //                             }
    //                         }
    //                     ]
    //                 }
    //             }
    //             await database.increment(model.roomPerHourPerDayOccupancy, 'occupiedCapacity', query)
    //             console.log("*** &&&&&&&&7 ****")

    //         }
    //     }
    // });



    model.childBookingSessionDetail.addHook('afterBulkCreate', async (instance) => {
        console.log("***----------------------****")
        console.log("***----------------------****")
        console.log("***----------------------****")
        console.log("***----------------------****")
        let childBookingDetail = await database.findBy(model.childBookingDetail, { childId: instance[0].childId })
        
        let roomQuery = {
            where:{
                roomId : childBookingDetail.roomId
            }
        }
        let roomOccupency = await database.fetch(model.roomPerHourPerDayOccupancy,roomQuery)
        
            for(let session of instance)
            {
                for(let room of roomOccupency)
                {
                    if(room.day == session.day)
                    {
                        let sessionStartTime = moment.unix(session.startTime).format('HH:mm')
                        let sessionEndTime = moment.unix(session.endTime).format('HH:mm')

                        let roomStartTime = moment.unix(room.startTime).format('HH:mm')
                        let roomEndTime = moment.unix(room.endTime).format('HH:mm')


                        if(roomStartTime>=sessionStartTime)
                        {
                            if(roomEndTime<= sessionEndTime)
                            {
                                console.log('===+++++ CONDITION 2 IS TRUE ++++++++ =====  ' )
                                
                                room.occupiedCapacity = room.occupiedCapacity + 1
                                await database.save(room)
                            }

                        }
                    }
                }
            }
    });




    /***
     * 
     * HOOK:  AFTER BULK UPDATING CHILD BOOKING SESSION. 
     * 
    //  */
    /***
    * 
    * HOOK:  AFTER CREATING STAFF. 
    * 
    */
    model.staffContract.addHook('afterCreate', async (instance) => {
        /*
        let superAdminPriviledges = [
            {
                name: "Occpupancy Management",
                visibility: 1,
                read: 1,
                write: 1,
                update: 1,
                delete: 1
            },
            {
                name: "Session Management",
                visibility: 1,
                read: 1,
                write: 1,
                update: 1,
                delete: 1
            },
            {
                name: "Child Management",
                visibility: 1,
                read: 1,
                write: 1,
                update: 1,
                delete: 1
            },
            {
                name: "Finance Management",
                visibility: 1,
                read: 1,
                write: 1,
                update: 1,
                delete: 1
            },
            {
                name: "H.R Management",
                visibility: 1,
                read: 1,
                write: 1,
                update: 1,
                delete: 1
            },
            {
                name: "Global Setting",
                visibility: 1,
                read: 1,
                write: 1,
                update: 1,
                delete: 1
            },
            {
                name: "Reporting",
                visibility: 1,
                read: 1,
                write: 1,
                update: 1,
                delete: 1
            },
        ]
        let branchManagerPriviledges = [
            {
                name: "Occpupancy Management",
                visibility: 1,
                read: 1,
                write: 0,
                update: 0,
                delete: 0
            },
            {
                name: "Session Management",
                visibility: 1,
                read: 1,
                write: 0,
                update: 0,
                delete: 0
            },
            {
                name: "Child Management",
                visibility: 1,
                read: 1,
                write: 1,
                update: 1,
                delete: 1
            },
            {
                name: "Finance Management",
                visibility: 1,
                read: 1,
                write: 0,
                update: 0,
                delete: 0
            },
            {
                name: "H.R Management",
                visibility: 1,
                read: 1,
                write: 0,
                update: 0,
                delete: 0
            },
            {
                name: "Global Setting",
                visibility: 0,
                read: 0,
                write: 0,
                update: 0,
                delete: 0
            },
            {
                name: "Reporting",
                visibility: 0,
                read: 0,
                write: 0,
                update: 0,
                delete: 0
            },
        ]
        let systemUserPriviledges = [
            {
                name: "Occpupancy Management",
                visibility: 1,
                read: 1,
                write: 1,
                update: 1,
                delete: 1
            },
            {
                name: "Session Management",
                visibility: 1,
                read: 1,
                write: 1,
                update: 1,
                delete: 1
            },
            {
                name: "Child Management",
                visibility: 1,
                read: 1,
                write: 1,
                update: 1,
                delete: 1
            },
            {
                name: "Finance Management",
                visibility: 1,
                read: 1,
                write: 1,
                update: 1,
                delete: 1
            },
            {
                name: "H.R Management",
                visibility: 0,
                read: 0,
                write: 0,
                update: 0,
                delete: 0
            },
            {
                name: "Global Setting",
                visibility: 0,
                read: 0,
                write: 0,
                update: 0,
                delete: 0
            },
            {
                name: "Reporting",
                visibility: 0,
                read: 0,
                write: 0,
                update: 0,
                delete: 0
            },
        ]
*/
        let priviledges, userRole, roleDetails;
        if (instance.jobTitle == "seniorManager" || instance.jobTitle == "trainingManager" ||
            instance.jobTitle == "director" || instance.jobTitle == "iTSupportTechnician") {
            userRole = "Super Admin";

            // instance.role = "superAdmin";
            // priviledges = superAdminPriviledges.map(matrix => ({ ...matrix, staffId: instance.staffId, createdTime: moment().unix(), updatedTime: moment().unix() }))
        }
        else if (instance.jobTitle == "preSchoolDeputyManager" || instance.jobTitle == "preSchoolManager" ||
            instance.jobTitle == "deputyManager" || instance.jobTitle == "nurseryManager") {
            // instance.role = "branchManager";
            // priviledges = branchManagerPriviledges.map(matrix => ({ ...matrix, staffId: instance.staffId, createdTime: moment().unix(), updatedTime: moment().unix() }))
            userRole = "Branch Manager";

        }
        else if (instance.jobTitle == "accountsAssistant" || instance.jobTitle == "senior" ||
            instance.jobTitle == "adminAssistant" || instance.jobTitle == "nurseryPractitionerLevel6") {
            // instance.role = "systemUser";
            // priviledges = systemUserPriviledges.map(matrix => ({ ...matrix, staffId: instance.staffId, createdTime: moment().unix(), updatedTime: moment().unix() }))
            userRole = "System User";

        }
        // this change is commented because we remove UserPermission form child and staff Attendance routes
        //usman change for following roles as a System user because they have to use the app not CMS
        // else if (instance.jobTitle == "accountsAssistant" || instance.jobTitle == "senior" ||
        //     instance.jobTitle == "adminAssistant" || instance.jobTitle == "nurseryAssistantUnqualified" || instance.jobTitle == "nurseryAssistantLevel2" ||
        //     instance.jobTitle == "nurseryPractitionerLevel3" || instance.jobTitle == "nurseryPractitionerLevel3+Grade-C" ||instance.jobTitle == "nurseryPractitionerLevel3+Grade-B" ||
        //     instance.jobTitle == "nurseryPractitionerLevel3+Grade-A" || instance.jobTitle == "roomLeader") {
        //     // instance.role = "systemUser";
        //     // priviledges = systemUserPriviledges.map(matrix => ({ ...matrix, staffId: instance.staffId, createdTime: moment().unix(), updatedTime: moment().unix() }))
        //     userRole = "System User";

        // }
        else {
            userRole = "noAccess";
            instance.roleType = "noAccess";
            //change by usman
            //await instance.save();

        }
        // instance.role = "noAccess";

        if (userRole !== "noAccess") {
            roleDetails = await database.findBy(model.predefinedSystemRole, { name: userRole });
            console.log("roleDetails", roleDetails);
            if (roleDetails) {
                instance.roleId = roleDetails.id;
                instance.roleType = "standard";
                //await instance.save();

            }
        }

        let points = 0
        //let eightPointsRole = ['nurseryAssistantLevel2','nurseryPractitionerLevel3','nurseryPractitionerLevel3+Grade-C','nurseryPractitionerLevel3+Grade-B', 'nurseryPractitionerLevel3+Grade-A','roomLeader','senior']
        let eightPointsRole = ['nurseryAssistantUnqualified', 'nurseryAssistantLevel2', 'nurseryPractitionerLevel3+','nurseryPractitionerLevel3+Grade-C', 'nurseryPractitionerLevel3+Grade-B', 'nurseryPractitionerLevel3+Grade-A',
        'roomLeader', 'senior', 'preSchoolDeputyManager', 'preSchoolManager', 'deputyManager', 'nurseryManager', 'seniorManager',
        'trainingManager', 'adminAssistant', 'director', 'accountsAssistant', 'iTSupportTechnician']

        let fifteenPointsRole = ['nurseryPractitionerLevel6']
        if(eightPointsRole.includes(instance.jobTitle))
        {
            points = 8
        }
        if(fifteenPointsRole.includes(instance.jobTitle))
        {
            points = 15
        }
        instance.occupancyPoints = points
        await instance.save();


        // database.bulkSave(model.moduleManagement, priviledges);

        console.log("hey in S>C HOOk !");
    });


    /***
        * 
        * HOOK:  AFTER CREATING BRANCH. 
        * 
        */
    // model.branch.addHook('afterCreate', async (instance) => {

       

    //     // let predefinedTerms = [
    //     //     {
    //     //         name: "Spring Term",
    //     //         startDate: 1609459200,
    //     //         endDate: 1617235200,
    //     //     },
    //     //     {
    //     //         name: "Summer Term",
    //     //         startDate: 1617235200,
    //     //         endDate: 1630454400,
    //     //     },
    //     //     {
    //     //         name: "Autumn Term",
    //     //         startDate: 1630454400,
    //     //         endDate: 1640995200,
    //     //     },
    //     //     //  -------------
    //     //     {
    //     //         name: "Spring Term",
    //     //         startDate: 1640995200,
    //     //         endDate: 1648771200,
    //     //     },
    //     //     {
    //     //         name: "Summer Term",
    //     //         startDate: 1648771200,
    //     //         endDate: 1661990400,
    //     //     },
    //     //     {
    //     //         name: "Autumn Term",
    //     //         startDate: 1661990400,
    //     //         endDate: 1672531200,
    //     //     },

    //     //     //  ---------------------
    //     //     {
    //     //         name: "Spring Term",
    //     //         startDate: 1672531200,
    //     //         endDate: 1680307200,
    //     //     },
    //     //     {
    //     //         name: "Summer Term",
    //     //         startDate: 1680307200,
    //     //         endDate: 1693526400,
    //     //     },
    //     //     {
    //     //         name: "Autumn Term",
    //     //         startDate: 1693526400,
    //     //         endDate: 1704067200,
    //     //     },

    //     //     //  ---------------------
    //     //     {
    //     //         name: "Spring Term",
    //     //         startDate: 1704067200,
    //     //         endDate: 1711929600,
    //     //     },
    //     //     {
    //     //         name: "Summer Term",
    //     //         startDate: 1711929600,
    //     //         endDate: 1725148800,
    //     //     },
    //     //     {
    //     //         name: "Autumn Term",
    //     //         startDate: 1725148800,
    //     //         endDate: 1735689600,
    //     //     },


    //     //     //  ---------------------
    //     //     {
    //     //         name: "Spring Term",
    //     //         startDate: 1735689600,
    //     //         endDate: 1743465600,
    //     //     },
    //     //     {
    //     //         name: "Summer Term",
    //     //         startDate: 1743465600,
    //     //         endDate: 1756684800,
    //     //     },
    //     //     {
    //     //         name: "Autumn Term",
    //     //         startDate: 1756684800,
    //     //         endDate: 1767225600,
    //     //     },
    //     // ]


    //     let predefinedTerms = [
    //         {
    //             name: "Spring Term",
    //             startDate: "2021-01-01",
    //             endDate: "2021-04-01",
    //         },
    //         {
    //             name: "Summer Term",
    //             startDate: "2021-04-01",
    //             endDate: "2021-09-01",
    //         },
    //         {
    //             name: "Autumn Term",
    //             startDate: "2021-09-01",
    //             endDate: "2021-12-31",
    //         },
    //         //  --------------------- 2021
    //         {
    //             name: "Spring Term",
    //             startDate: "2022-01-01",
    //             endDate: "2022-04-01",
    //         },
    //         {
    //             name: "Summer Term",
    //             startDate: "2022-04-01",
    //             endDate: "2022-09-01",
    //         },
    //         {
    //             name: "Autumn Term",
    //             startDate: "2022-09-01",
    //             endDate: "2022-12-31",
    //         },
    //         //  --------------------- 2022
    //         {
    //             name: "Spring Term",
    //             startDate: "2023-01-01",
    //             endDate: "2023-04-01",
    //         },
    //         {
    //             name: "Summer Term",
    //             startDate: "2023-04-01",
    //             endDate: "2023-09-01",
    //         },
    //         {
    //             name: "Autumn Term",
    //             startDate: "2023-09-01",
    //             endDate: "2023-12-31",
    //         },
    //         //  --------------------- 2023

    //         {
    //             name: "Spring Term",
    //             startDate: "2024-01-01",
    //             endDate: "2024-04-01",
    //         },
    //         {
    //             name: "Summer Term",
    //             startDate: "2024-04-01",
    //             endDate: "2024-09-01",
    //         },
    //         {
    //             name: "Autumn Term",
    //             startDate: "2024-09-01",
    //             endDate: "2024-12-31",
    //         },
    //         //  --------------------- 2024

    //         {
    //             name: "Spring Term",
    //             startDate: "2025-01-01",
    //             endDate: "2025-04-01",
    //         },
    //         {
    //             name: "Summer Term",
    //             startDate: "2025-04-01",
    //             endDate: "2025-09-01",
    //         },
    //         {
    //             name: "Autumn Term",
    //             startDate: "2025-09-01",
    //             endDate: "2025-12-31",
    //         },
    //         //  --------------------- 2025

    //         {
    //             name: "Spring Term",
    //             startDate: "2026-01-01",
    //             endDate: "2026-04-01",
    //         },
    //         {
    //             name: "Summer Term",
    //             startDate: "2026-04-01",
    //             endDate: "2026-09-01",
    //         },
    //         {
    //             name: "Autumn Term",
    //             startDate: "2026-09-01",
    //             endDate: "2026-12-31",
    //         },
    //         //  --------------------- 2026

            
    //     ]


    //     terms = predefinedTerms.map(term => ({ ...term, branchId: instance.id, createdTime: moment().unix(), updatedTime: moment().unix() }))
        
    //     console.log("***___***___****_*******")
    //     console.log("***___***___****_*******")
    //     console.log("--> > >> " ,predefinedTerms)
    //     console.log("***___***___****_*******")
    //     console.log("***___***___****_*******")
    //     await database.bulkSave(model.term, terms);

    // });

    /***
        * 
        * HOOK:  AFTER CREATING STAFF SHIFT PATTERN. 
        * 
        */
    model.staffShiftPattern.addHook('afterBulkCreate',async (instance) => {
        const roomId = instance[0].dataValues.roomId
        let staff = await database.findById(model.staff,instance[0].dataValues.staffId)
        if(staff)
        {
            staff.roomId = roomId
            staff.updatedTime = moment().unix()
            await database.save(staff)
        }
    });

    // commented on 2021-12-08 due to changes of invoiceChildAdditionalItems
    // model.invoiceChildAdditionalItem.addHook('afterCreate',async (instance) => {
    //     console.log('=====>> INSTANNCE====== >>> :::  ',instance)
    //     let additionalItem = new model.childAdditionalItem()
    //     additionalItem.childId = instance.childId
    //     additionalItem.item = instance.item
    //     additionalItem.date = instance.date
    //     additionalItem.rate = instance.rate
    //     additionalItem.createdTime = moment().unix()
    //     additionalItem.updatedTime = moment().unix()
    //     await database.save(additionalItem)
    //     console.log('=====>> additionalItem SAVE ====== >>> :::  ',additionalItem)
    // });

    // no need of this hook now
    // model.invoiceChildAdditionalItem.addHook('afterUpdate',async (instance) => {
    //     console.log('=====>> INSTANNCE====== >>> :::  ',instance)
    //     let additionalItem = new model.childAdditionalItem()
    //     additionalItem.childId = instance.childId
    //     additionalItem.item = instance.item
    //     additionalItem.date = instance.date
    //     additionalItem.rate = instance.rate
    //     additionalItem.createdTime = moment().unix()
    //     additionalItem.updatedTime = moment().unix()
    //     await database.save(additionalItem)
    //     console.log('=====>> additionalItem UPDATE====== >>> :::  ',additionalItem)
    //  });


    // Usman work for staff contract role update

    //  model.staffContract.addHook('afterUpdate', async (instance) => {
    //     let priviledges, userRole, roleDetails;
    //     if (instance.jobTitle == "seniorManager" || instance.jobTitle == "trainingManager" ||
    //         instance.jobTitle == "director" || instance.jobTitle == "iTSupportTechnician") {
    //         userRole = "Super Admin";

    //         // instance.role = "superAdmin";
    //         // priviledges = superAdminPriviledges.map(matrix => ({ ...matrix, staffId: instance.staffId, createdTime: moment().unix(), updatedTime: moment().unix() }))
    //     }
    //     else if (instance.jobTitle == "preSchoolDeputyManager" || instance.jobTitle == "preSchoolManager" ||
    //         instance.jobTitle == "deputyManager" || instance.jobTitle == "nurseryManager") {
    //         // instance.role = "branchManager";
    //         // priviledges = branchManagerPriviledges.map(matrix => ({ ...matrix, staffId: instance.staffId, createdTime: moment().unix(), updatedTime: moment().unix() }))
    //         userRole = "Branch Manager";

    //     }
    //     else if (instance.jobTitle == "accountsAssistant" || instance.jobTitle == "senior" ||
    //         instance.jobTitle == "adminAssistant" || instance.jobTitle == "nurseryAssistantUnqualified" || instance.jobTitle == "nurseryAssistantLevel2" ||
    //         instance.jobTitle == "nurseryPractitionerLevel3" || instance.jobTitle == "nurseryPractitionerLevel3+Grade-C" ||instance.jobTitle == "nurseryPractitionerLevel3+Grade-B" ||
    //         instance.jobTitle == "nurseryPractitionerLevel3+Grade-A" || instance.jobTitle == "roomLeader") {
    //         // instance.role = "systemUser";
    //         // priviledges = systemUserPriviledges.map(matrix => ({ ...matrix, staffId: instance.staffId, createdTime: moment().unix(), updatedTime: moment().unix() }))
    //         userRole = "System User";

    //     }
    //     else {
    //         userRole = "noAccess";
    //         instance.roleType = "noAccess";
    //         await instance.save();

    //     }
    //     // instance.role = "noAccess";

    //     if (userRole !== "noAccess") {
    //         roleDetails = await database.findBy(model.predefinedSystemRole, { name: userRole });
    //         console.log("roleDetails", roleDetails);
    //         if (roleDetails) {
    //             instance.roleId = roleDetails.id;
    //             instance.roleType = "standard";
    //             await instance.save();

    //         }
    //     }
    //     // database.bulkSave(model.moduleManagement, priviledges);

    //     console.log("hey in S>C update HOOk !");
    // });


    model.branch.addHook('afterBulkUpdate', async (instance) => {
        console.log("***----------------------****")
        console.log("***----------------------****")
        console.log("***----------------------****")
        console.log("***----------------------**** ++++ >>> ", instance.where.id)
        const branchId = instance.where.id;
        const action = { isDeleted: 1,deletedTime: moment().unix() };
        const query={
            where : {
                branchId: branchId
            }
        }
        await database.bulkUpdate(model.room, action, query.where);
        // have to delete all data on branch deletion , changes by usman khalid
        // no need to delete calender,additional items,            
        //await database.bulkUpdate(model.child,action,where,true);
        // have to delete child one by one, because have to delete parent as well, giving discount in invoice

        let childList = await database.fetch(model.child,query)
        let childIds = []
        childList.forEach(async child => {
            childIds.push(child.id)
            child.deletedTime = moment().unix()
            child.isDeleted = 1
            await database.save(child) 
        });

       
        //await database.bulkUpdate(models.childGuardianDetail,action,where); // because of sibling discount

        const quardiansWhere = {
            childId : childIds
        }
        await database.bulkUpdate(model.childGuardianDetail,action,quardiansWhere); // because of sibling discount

        // have to delete staff bank details as well

        let staffList = await database.fetch(model.staff,query)
        console.log('==== >>> staffList === >> ',staffList)
        let staffIds = []
        staffList.forEach(async staff => {
            staffIds.push(staff.id)
            staff.deletedTime = moment().unix()
            staff.isDeleted = 1
            await database.save(staff) 
        });

        const staffWhere = {
            staffId : staffIds
        }

        console.log('=== >> staffIds === >> ',staffIds)

        //await database.bulkUpdate(model.staff,action,where); // because staff can't add in other branch
        
        await database.bulkUpdate(model.staffBankDetail,action,staffWhere); 
        
        // no need to delete other data

        
    });



    model.branch.addHook('afterCreate', async (instance) => {
        
        console.log('------- IN AFTRE CREATE HOOK OF BRANCH ---------------')
        let predefinedTerms=[]
        let name,startDate,endDate
        let currentYear = moment().format('YYYY');
        let previousEndDate;
        let tempStartDate = moment(currentYear).startOf('year').format('YYYY-MM-DD');
        for(let yearsLoop=0;yearsLoop<8;yearsLoop++)
        {
            for(let i=0;i<3;i++)
            {
                // if(i==0)
                // {
                //     name="Spring Term"
                //     startDate = moment(currentYear).startOf('year').format('YYYY-MM-DD');
                //     endDate = moment(startDate).add(3,'month').startOf('month').format('YYYY-MM-DD');
                // }
                // else if(i==1)
                // {
                //     name="Summer Term"
                //     startDate = moment(previousEndDate).format('YYYY-MM-DD')
                //     endDate  = moment(startDate).add(5,'month').startOf('month').format('YYYY-MM-DD'); 
                // }
                // else if(i==2)
                // {
                //     name="Autumn Term"
                //     startDate = moment(previousEndDate).format('YYYY-MM-DD')
                //     endDate = moment(startDate).add(3,'month').endOf('month').format('YYYY-MM-DD'); 
                // }
                if(i==0)
                {
                    name="Spring Term"
                    startDate = moment(tempStartDate).startOf('year').format('YYYY-MM-DD');
                    endDate = moment(tempStartDate).add(2,'month').endOf('month').format('YYYY-MM-DD');
                    previousEndDate = moment(endDate).add(1,'month').startOf('month').format('YYYY-MM-DD');
                    //endDate = moment(tempStartDate).add(3,'month').startOf('month').format('YYYY-MM-DD');
                }
                else if(i==1)
                {
                    name="Summer Term"
                    startDate = moment(previousEndDate).format('YYYY-MM-DD')
                    //endDate  = moment(tempStartDate).add(5,'month').startOf('month').format('YYYY-MM-DD');
                    endDate  = moment(previousEndDate).add(4,'month').endOf('month').format('YYYY-MM-DD'); 
                    previousEndDate = moment(endDate).add(1,'month').startOf('month').format('YYYY-MM-DD');
                }
                else if(i==2)
                {
                    name="Autumn Term"
                    startDate = moment(previousEndDate).format('YYYY-MM-DD')
                    endDate = moment(previousEndDate).add(3,'month').endOf('month').format('YYYY-MM-DD'); 
                }
                //previousEndDate = moment(endDate).format('YYYY-MM-DD')
                predefinedTerms.push({
                    name,
                    startDate,
                    endDate
                })
            }
            //currentYear = moment(currentYear).add(1,'year').format('YYYY')
            tempStartDate = moment(tempStartDate).add(1,'year').startOf('year').format('YYYY-MM-DD');
        }

        let terms = predefinedTerms.map(term => ({ ...term, branchId: instance.id, createdTime: moment().unix(), updatedTime: moment().unix() }))
        
    //     console.log("***___***___****_*******")
    //     console.log("***___***___****_*******")
    //     console.log("--> > >> " ,predefinedTerms)
    //     console.log("***___***___****_*******")
    //     console.log("***___***___****_*******")
        await database.bulkSave(model.term, terms);

    });


    // model.invoice.addHook('afterBulkUpdate', async (instance) => {

    //     console.log('=== >> IN BULK UPDATE HOOK == >>>',instance.where)

    //         let query = {
    //             where: instance.where
    //         }
    //         let invoiceChildBookingDetailsList = await database.fetchWithScope(model.invoice, [{ method: ['invoiceChildBookingDetailsList'] }],query)
    //         invoiceChildBookingDetailsList.forEach(async invoice => {
    //             let childBookingDetailIds = []
    //             //invoice.invoiceChildBookingDetail.forEach(async booking => {
                
    //             for(let i=0;i<invoice.invoiceChildBookingDetail.length;i++)
    //             {
    //                 let booking = invoice.invoiceChildBookingDetail[i]
    //             // fetch booking
    //                 const childBookingDetail = await database.findById_v2(model.childBookingDetail,booking.childBookingId)
    //                 //childBookingDetailIds.push(booking.childBookingId)
                    
    //                 if(childBookingDetail && childBookingDetail.lastInvoicedDate && childBookingDetail.lastInvoicedDate < invoice.createdDate)
    //                 {
    //                     childBookingDetailIds.push(booking.childBookingId)
    //                 }
    //                 if(childBookingDetail && !childBookingDetail.lastInvoicedDate)
    //                 {
    //                     childBookingDetailIds.push(booking.childBookingId)

    //                 }
    //             //});
    //             }

    //             if(childBookingDetailIds.length>0)
    //             {
    //                 let action_v2 = {
    //                     lastInvoicedDate: moment(invoice.createdDate).startOf('month').format('YYYY-MM-DD'),
    //                 }
    //                 let where_v2 = {
    //                     id: childBookingDetailIds
    //                 }
    //                 //await database.bulkUpdate(model.childBookingDetail,action_v2,where_v2)
    //             }
    //         });
    // });


    model.invoice.addHook('afterBulkUpdate', async (instance) => {
        let invoiceIds  = instance.where.id
        for(let invoiceId=0; invoiceId<invoiceIds.length; invoiceId++)
        {
            let query = {
                where: {
                    id: invoiceIds[invoiceId]
                }
            }

            let invoiceChildBookingDetailsList = await database.fetchWithScope(model.invoice, [{ method: ['invoiceChildBookingDetailsList'] }],query)
            //invoiceChildBookingDetailsList.forEach(async invoice => {
            for(let invoiceDetail = 0; invoiceDetail<invoiceChildBookingDetailsList.length; invoiceDetail++)
            {
                let invoice = invoiceChildBookingDetailsList[invoiceDetail]
                let childBookingDetailIds = []
                for(let i=0;i<invoice.invoiceChildBookingDetail.length;i++)
                {
                    let booking = invoice.invoiceChildBookingDetail[i]
                    // fetch booking
                    const childBookingDetail = await database.findById_v2(model.childBookingDetail,booking.childBookingId)

                    if(childBookingDetail && childBookingDetail.lastInvoicedDate && childBookingDetail.lastInvoicedDate < invoice.createdDate)
                    {
                        childBookingDetailIds.push(booking.childBookingId)
                    }
                    else if(childBookingDetail && !childBookingDetail.lastInvoicedDate)
                    {
                        childBookingDetailIds.push(booking.childBookingId)
                    }
                }
                if(childBookingDetailIds.length>0)
                {

                    let action_v2 = {
                        lastInvoicedDate: moment(invoice.createdDate).startOf('month').format('YYYY-MM-DD'),
                    }
                    let where_v2 = {
                        id: childBookingDetailIds
                    }
                    console.log('=== >> childBookingDetailIds== >>>',{childBookingDetailIds,action_v2,where_v2})

                    await database.bulkUpdate(model.childBookingDetail,action_v2,where_v2)
                }
            }
            //});
        }

    });





}
