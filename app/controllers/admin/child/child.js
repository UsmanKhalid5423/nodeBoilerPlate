/*******************************************************/
// Importing Files.
/*******************************************************/
const database = require("../../../utility/calls/databaseRequest");
const models = require("../../../../database/sequelize/sequelize");
const response = require("../../../utility/functions/response");
const pagination = require("../../../utility/functions/pagination");
const filterBy = require("../../../utility/functions/filter");

/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const moment = require("moment");
const operator = require("sequelize").Op;
const sequelize = require("sequelize");
/*******************************************************/
//Main Controllers.
/*******************************************************/

/**
 * Controller: ADD A NEW RECORD.
 */
const add = async (req, res, next) => {
    try {
        const dataAvailabilityResult = await isDataAvailable(req);
        if (!dataAvailabilityResult) {
            return response.send(req, res, next, "warning", 202, "DATA_NOT_AVAILABLE", null);
        }
        const childResult = await manageChild(req, new models.child({}));
        if (childResult) {
            return response.send(
                req,
                res,
                next,
                "info",
                201,
                "CHILD_ADDED",
                childResult
            );
        }
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }

};

/**
 * Controller: FETCH ALL RECORDS.
 */
const fetch = async (req, res, next) => {
    try {
        console.log('== >> In function = >> ');
        let result;
        let query = { where: {status: true, isDeleted:false} }, countQuery, filterResult, count;
        const {  search } = req.query;
        let id = req.params.id;
        id = 1
        //result = await database.fetch(models.child,{})
        let where = {
            id
        }
        result = await database.fetchWithScope(models.child, [{ method: ['branchChilds', where] }], {});

        count = result.length
        const cursorPagination = pagination.cursor(req, count);

        data = {
            listing: result,
            pagination: cursorPagination
        };
        response.send(
            req,
            res,
            next,
            "info",
            200,
            "FETCH_SUCCESSFULLY",
            data
        );

    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
};


/**
 * Controller: FETCH ALL RECORDS.
 */
 const fetch_v3 = async (req, res, next) => {
    try {
        let result;
        let query = { where: {status: true, isDeleted:false} }, countQuery, filterResult, count, roomFilter, bookedStudents, takeAttendance, currentSessionAttendance, takeAttendanceQuery = {}, roomId;
        let where_v2;
        const { fetchType, search, attributes, otherAttributes } = req.query;
        if (fetchType === "dropdown") {
            query.where.status = true;
            if (search) {
                filterBy.search(query, "firstName", search);
            }
            // attributes = ["id", "name", "registrationNumber"]
            result = await database.fetchWithSorting(models.child, query, null, "firstName", "ASC");
        }
        else {
            const days =  ["monday", "tuesday", "wednesday", "thursday", "friday" , "saturday", "sunday"];
            const currentDay = moment().isoWeekday() - 1;
        
            if ('attributes' in req.query)
                roomFilter = JSON.parse(attributes).find(item => item.key === "roomId");

            if ('otherAttributes' in req.query){
                bookedStudents = JSON.parse(otherAttributes).find(item => item.key === "bookedStudents");
                takeAttendance = JSON.parse(otherAttributes).find(item => item.key === "takeAttendance");
                currentSessionAttendance = JSON.parse(otherAttributes).find(item => item.key === "sessionId");
            }

            // console.log("filterResultInnerQuery",filterResultInnerQuery);
            if (search) {
                // filterBy.search(filterResult,"firstName", search);
                filterBy.searchOnMultipleFields(query, ["firstName", "lastName"], search);
            }
            filterResult = filterBy.filter_v2(req, query);

            countQuery = { ...filterResult };
            const paginationResult = pagination.offsetPagination(req, filterResult);
            console.log(paginationResult);
            console.log("takeAttendance",takeAttendance);
            //let startDate = moment().add(1,'month').startOf('month').format('YYYY-MM-DD')
            //let startDate = moment().startOf('month').format('YYYY-MM-DD')
            let {invoiceDate,isAdditionaItemsList} = req.query //moment().subtract(1,'month').startOf('month').format('YYYY-MM-DD')
            let invoiceCurrentDate = moment(invoiceDate).format('DD')
            if(invoiceCurrentDate>=27)
            {
                invoiceDate = moment(invoiceDate).add(1,'month').startOf('month').format('YYYY-MM-DD')
            }
            else
            {
                invoiceDate = moment(invoiceDate).startOf('month').format('YYYY-MM-DD')
            }
            //isAdditionaItemsList = true
            if(isAdditionaItemsList)
            {
                invoiceDate = moment().format('YYYY-MM-DD')
                let endOfMonth = moment(invoiceDate).endOf('month').format('YYYY-MM-DD')
                where_v2 = {
                    status: true, [operator.or]:[   
                        {
                            isDeleted: false,
                        },
                        {
                            [operator.and]:[
                                {
                                    isDeleted: true,
                                },
                                {
                                    isDeletedDueToEdit: true
                                }
                            ]
                        } 
                    ],
                    [operator.or]:[
                        {
                            [operator.and]:[
                                {
                                    [operator.or]:[
                                        {
                                            lastInvoicedDate: {
                                                [operator.lt]: invoiceDate
                                            }
                                        },
                
                                        {
                                            lastInvoicedDate: null
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            [operator.and]:[
                                {
                                    [operator.or]:[
                                        {
                                            joiningDate: {
                                                [operator.lte]: invoiceDate,
                                            },
                                        },
                                        {
                                            [operator.and]:[
                                                {
                                                    joiningDate: {
                                                        [operator.gt]: invoiceDate,
                                                    },
                                                },
                                                {
                                                    joiningDate: {
                                                        [operator.lte]: moment(invoiceDate).endOf('month').format('YYYY-MM-DD'),
                                                    },
                                                },
                                                {
                                                    [operator.or]:[
                                                        {
                                                            leavingDate: {
                                                                [operator.gt]: endOfMonth,
                                                            },
                                                        },
                                                        {
                                                            leavingDate: null
                                                        },
                                                        {
                                                            lastInvoicedDate: null
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    [operator.or]:[
                                        {
                                            leavingDate: {
                                                [operator.gte]: invoiceDate,//moment().format('YYYY-MM-DD')
                                            },
                                        },
                                        {
                                            leavingDate: { [operator.eq]: null }
                                        },
                                    ]
                                },
                            ],
                        }
                    ],
                }
                // query change, 6 october
                
                // where_v2 = {
                //     status: true,
                //     [operator.or]:[   
                //         {
                //             isDeleted: false,
                //         },
                //         {
                //             [operator.and]:[
                //                 {
                //                     isDeleted: true,
                //                 },
                //                 {
                //                     isDeletedDueToEdit: true
                //                 }
                //             ]
                //         } 
                //     ],
                //     [operator.and]:[
                //         {
                //             [operator.or]:[
                //                 {
                //                     leavingDate: {
                //                         [operator.gt]: endOfMonth,
                //                     },
                //                 },
                //                 {
                //                     leavingDate: null
                //                 },
                //                 {
                //                     lastInvoicedDate: null
                //                 }
                //             ]
                //         },
                //     ],
                // }

            }
            else{
                let endOfMonth = moment(invoiceDate).endOf('month').format('YYYY-MM-DD')
                where_v2 = {    
                        status: true, [operator.or]:[   
                            {
                                isDeleted: false,
                            },
                            {
                                [operator.and]:[
                                    {
                                        isDeleted: true,
                                    },
                                    {
                                        isDeletedDueToEdit: true
                                    }
                                ]
                            } 
                        ],
                        [operator.and]:[
                            {
                                [operator.or]:[
                                    {
                                        joiningDate: {
                                            [operator.lte]: invoiceDate,
                                        },
                                    },
                                    {
                                        [operator.and]:[
                                            {
                                                joiningDate: {
                                                    [operator.gt]: invoiceDate,
                                                },
                                            },
                                            {
                                                joiningDate: {
                                                    [operator.lte]: moment(invoiceDate).endOf('month').format('YYYY-MM-DD'),
                                                },
                                            },
                                            {
                                                [operator.or]:[
                                                    {
                                                        leavingDate: {
                                                            [operator.gt]: endOfMonth,
                                                        },
                                                    },
                                                    {
                                                        leavingDate: null
                                                    },
                                                    {
                                                        lastInvoicedDate: null
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                [operator.or]:[
                                    {
                                        leavingDate: {
                                            [operator.gte]: invoiceDate,//moment().format('YYYY-MM-DD')
                                        },
                                    },
                                    {
                                        leavingDate: { [operator.eq]: null }
                                    },
                                ]
                            },
                            {
                                [operator.and]:[
                                    {
                                        [operator.or]:[
                                            {
                                                lastInvoicedDate: {
                                                    [operator.lt]: invoiceDate
                                                }
                                            },
                    
                                            {
                                                lastInvoicedDate: null
                                            },
                                        ]
                                    },
                                ]
                            }
                        ],
                }
                // query change, 6 october
                // where_v2 = {
                //     status: true,
                    // [operator.or]:[   
                    //     {
                    //         isDeleted: false,
                    //     },
                    //     {
                    //         [operator.and]:[
                    //             {
                    //                 isDeleted: true,
                    //             },
                    //             {
                    //                 isDeletedDueToEdit: true
                    //             }
                    //         ]
                    //     } 
                    // ],
                //     [operator.and]:[
                //         {
                //             [operator.or]:[
                //                 {
                //                     leavingDate: {
                //                         [operator.gt]: endOfMonth,
                //                     },
                //                 },
                //                 {
                //                     leavingDate: null
                //                 },
                //                 {
                //                     lastInvoicedDate: null
                //                 }
                //             ]
                //         },
                //     ],
                // }

            }


            if ((takeAttendance && (takeAttendance['value']) === true)){
                let bookedStudents = JSON.parse(otherAttributes).find(item => item.key === "bookedStudents");
           
                // const currentDay = moment().isoWeekday() - 1;
                console.log("->== = == = = = = = === ",days[currentDay]);
                roomId = JSON.parse(attributes).find(item => item.key === "roomId");
                  
                // Mujtaba bro code not working 
                //if (currentSessionAttendance && parseInt(currentSessionAttendance['value'] > 0) ){
                
                //Usman Khalid code + added profilePicturePath key in attributes
                if (currentSessionAttendance ){
                    //changed by usman asked by usman habib child day check removed
                    //takeAttendanceQuery = {day:days[currentDay] , sessionId: currentSessionAttendance['value'], isDeleted: false }
                    takeAttendanceQuery = {sessionId: currentSessionAttendance['value'], isDeleted: false }
                    result = await database.fetchWithScope(models.child, [{ method: ['childBookingSessionDetail', takeAttendanceQuery   ] }], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth','profilePicturePath']);        
                }
                else{
                    //changed by usman asked by usman habib child day check removed
                    //takeAttendanceQuery = {day:days[currentDay] , sessionId: {[operator.ne]: null}, isDeleted: false }
                    takeAttendanceQuery = { sessionId: {[operator.ne]: null}, isDeleted: false }
                    result = await database.fetchWithScope(models.child, [{ method: ['childBookingSessionDetail',   takeAttendanceQuery ] }], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth','profilePicturePath']);        
                    //console.log('result===>',result.length)
                }
     }
            
                else if (roomFilter && (bookedStudents && (bookedStudents['value']) === true))
                result = await database.fetchWithScope(models.child, [{ method: ['activeBookingWrtRoom_v2', where_v2] }], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'roomId' , 'branchId']);
            
                else if (roomFilter )
                result = await database.fetchWithScope(models.child, ['room'], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'roomId' , 'branchId']);
          
                else if ((bookedStudents && (bookedStudents['value']) === true))
                result = await database.fetchWithScope(models.child, [{ method: ['activeBookingWrtRoom_v2', where_v2] }], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'roomId' , 'branchId']);
                // result = await database.fetchWithScope(models.child, ['activeBooking'], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'roomId' , 'branchId']);
          
                else
                {
                    console.log('=========== LAST ELSE =============')
                // result = await database.fetchWithScope(models.child, ["branch", "room"], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'roomId', 'branchId']);
                    delete attributes.activeBooking;
                    
                    result = await database.fetchWithScope(models.child, ["branch"], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'roomId', 'branchId']);
                    console.log('=========== LAST ELSE =============')

                }
        }
        let data;
        if (fetchType === "dropdown") {
            data = result;
        }
        else {
            console.log("countQuery", countQuery);

            if ((takeAttendance && (takeAttendance['value']) === true) && roomFilter){
                console.log('=========> IN FIRST CONDITION=================>')

                console.log("takeAttendanceQuery",takeAttendanceQuery);
                
                console.log('=========> THE QUEREY IS=================>')


                // working count
                count = await models.child.count({
                    include:[
                        {
                            model: models.childBookingDetail,
                            as: 'childBookingDetail',
                            required: true,
                            where:{
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
                        
                            },
                            attributes: ['id','joiningDate','leavingDate'],
                            
                        },
                        {
                            model: models.childAttendance,
                            as: 'childAttendance',
                            required: false,
                            where: { createdDate: moment(moment().unix() * 1000).format('YYYY-MM-DD') },
                        },
                        {
                            model: models.room,
                            as: 'room',
                            required: true, 
                            attributes: ["id", "name"],
                            where: {status: true, isDeleted: false},
                        },
                    ],
                    where: countQuery.where,
                    group: ['child.id']
                })
                // discuss
                count = count.length

                // count = await models.childBookingDetail.findAndCountAll({
                //     include:[
                //         {
                //             model: models.child,
                //             as: 'child',
                //             required: true,
                //             where: countQuery.where,
                //             include:[
                //                 {
                //                     model: models.childAttendance,
                //                     as: 'childAttendance',
                //                     required: false,
                //                     where: { createdDate: moment(moment().unix() * 1000).format('YYYY-MM-DD') },
                //                 },
                //                 {
                //                     model: models.room,
                //                     as: 'room',
                //                     required: true, 
                //                     attributes: ["id", "name"],
                //                     where: {status: true, isDeleted: false},
                //                 },
                //             ]
                //         },
                //     ],
                //     where:{
                //         [operator.and]:[
                //             {
                //                 joiningDate:{
                //                 [operator.lte]:moment().format('YYYY-MM-DD')
                //                 }
                //             },
                //             {
                //                 [operator.or]: [
                //                     {
                //                         leavingDate: {
                //                             [operator.gte]: moment().format('YYYY-MM-DD')
                //                         },
                //                     },
                //                     {
                //                         leavingDate: { [operator.eq]: null }
                //                     },
            
                //                 ]
                //             }
                //         ]
                
                //     },
                //     attributes: ['id','joiningDate','leavingDate'],
                //     //group: ['childBookingDetail.childId']

                // })
                    

                // count = await database.countWithAssociation(models.child, countQuery.where, 
                //     [
                //     {
                //         model: models.childBookingDetail,
                //         as: 'childBookingDetail',
                //         required: true,
                //         where:{
                //             [operator.and]:[
                //                 {
                //                     joiningDate:{
                //                     [operator.lte]:moment().format('YYYY-MM-DD')
                //                     }
                //                 },
                //                 {
                //                     [operator.or]: [
                //                         {
                //                             leavingDate: {
                //                                 [operator.gte]: moment().format('YYYY-MM-DD')
                //                             },
                //                         },
                //                         {
                //                             leavingDate: { [operator.eq]: null }
                //                         },
                
                //                     ]
                //                 }
                //             ]
                    
                //         },
                //         groupBy:'childId',
                //         attributes: ['id','joiningDate','leavingDate'],
                        
                //     },
                //     {
                //         model: models.childAttendance,
                //         as: 'childAttendance',
                //         required: false,
                //         where: { createdDate: moment(moment().unix() * 1000).format('YYYY-MM-DD') },
                //     },
                //     {
                //         model: models.room,
                //         as: 'room',
                //         required: true, 
                //         attributes: ["id", "name"],
                //         where: {status: true, isDeleted: false},
                //     },
                //     {groupBy: ['childId']}
                //     //{groupBy : models.childBookingDetail.childId}

                // ],
        
                // );
                console.log('=========> THE QUEREY IS=================>')
                console.log('==== RESPONSE OF COUNT QUEREY IS === >>>',count)
            }

            else if ((takeAttendance && (takeAttendance['value']) === true)){
                console.log('=========> IN ELSE=================>')

                console.log("takeAttendanceQuery",takeAttendanceQuery);
                // old condition
                // count = await database.countWithAssociation(models.child, countQuery.where, [
                //     {
                //         model: models.childBookingSessionDetail,
                //         as: 'childBookingSessionDetails',
                //         required: true,
                //         where: takeAttendanceQuery,
                //     },
        
                //     {
                //         model: models.childAttendance,
                //         as: 'childAttendance',
                //         //Mujtaba bro code
                //         //required: true,
                //         //Usman Khalid Code beacuase there could be any student whose attendace is not yet marked
                //         required: false,
                //         where: { createdDate: moment(moment().unix() * 1000).format('YYYY-MM-DD') },
                //     }
        
                // ]);

                count = await database.countWithAssociation(models.child, countQuery.where, [
                    {
                        model: models.childBookingDetail,
                        as: 'childBookingDetail',
                        required: true,
                        where:{
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
                    
                        },
                        attributes: ['id','joiningDate','leavingDate'],
                        // commented by usman because, day check is removed
                        include:[
                            {
                                model: models.childBookingSessionDetail,
                                as: 'childBookingSessions',
                                //required: true, // required false because day check removed
                                required: false,
                                where: takeAttendanceQuery,
                            },
                
                        
                
                        ]
                    },
                    {
                        model: models.childAttendance,
                        as: 'childAttendance',
                        //Mujtaba bro code
                        //required: true,
                        //Usman Khalid Code beacuase there could be any student whose attendace is not yet marked
                        required: false,
                        where: { createdDate: moment(moment().unix() * 1000).format('YYYY-MM-DD') },
                    }
                  
                ]);
                // This line is added because the day check is removed and returns 5 sessions of a child
                //count = result.length;
                // count = count/5;
            }
            //Mujtaba bro code here is 
            // Only if condition which also execute roomFilter condition solution 1
            else if (roomFilter && (bookedStudents && (bookedStudents['value']) === true)) {
                count = await database.countWithAssociation(models.child, countQuery.where, [
                    {
                        model: models.childBookingDetail,
                        as: 'childBookingDetail',
                        required: true, 
                        attributes: ["id"],
                        where: {status: true, isDeleted: false , 
                            // commented by usman, room mei listing sahi nahi aa rahi
                            // [operator.or]: [  
                            // {
                            //     leavingDate:{
                            //         [operator.gte]: moment().format('YYYY-MM-DD')
                            //     },      
                            // }, 
                            // {
                            //     leavingDate: {[operator.eq]: null}
                            // },
                            
                            // ] 
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
                    },
                        
                    },
                    {
                        model: models.room,
                        as: 'room',
                        required: true, 
                        attributes: ["id", "name"],
                        where: {status: true, isDeleted: false},
                    }
                ]);
                }
            // solution 2 is 
            // else if(roomFilter && !(takeAttendance && (takeAttendance['value']) === true))
           else if (roomFilter) {
                count = await database.countWithAssociation(models.child, countQuery.where, [
                    {
                        model: models.room,
                        as: 'room',
                        required: true,
                        // where: countQuery.where,
                    }]);

            }
            else  if ((bookedStudents && (bookedStudents['value']) === true)) {
                console.log('==== >>>> second last if === >> ')
                // change by usman khalid, due to multiple bookings
                count = await database.countWithAssociation(models.child, countQuery.where, [
                    {
                        model: models.childBookingDetail,
                        as: 'childBookingDetail',
                        required: true,
                        where: where_v2
                }]);

                const query_v2 = {...countQuery}
                query_v2.where['activeBooking'] = true
                //count = await database.count(models.child,query_v2.where);
                console.log('==== >>> count === > ',count)

            }

            
            else{
                
                console.log('===== >> IN LAST ELSE CONDITION === >> ::')
                
                count = await database.count(models.child, countQuery.where);



                // count = await database.countWithAssociation(models.child, countQuery.where, [ 
                //     {
                //         model: models.room,
                //         as: 'room',
                //         required: true, 
                //         attributes: ["id", "name"],
                //         where: {status: true, isDeleted: false},
                //     }
                // ]);

            }
                // count = await database.count(models.child, countQuery.where);

            const cursorPagination = pagination.cursor(req, count);
            data = {
                listing: result,
                pagination: cursorPagination
            };
        }
        response.send(
            req,
            res,
            next,
            "info",
            200,
            "FETCH_SUCCESSFULLY",
            data
        );

    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
};


/**
 * Controller: FETCH ALL RECORDS.
 */
 const fetch_v4 = async (req, res, next) => {
    try {
        let result;
        let query = { where: {status: true, isDeleted:false} }, countQuery, filterResult, count, roomFilter, bookedStudents, takeAttendance, currentSessionAttendance, takeAttendanceQuery = {}, roomId;
        let query_v2 = { 
            where:{
                status: true,
                isDeleted: false,
                isPrimaryGuardian: true
            } 
        };
        const { fetchType, search, attributes, otherAttributes, showDiscountedChild,parentName } = req.query;
        if(showDiscountedChild)
        {
            query = { 
                where: {
                    status: true, isDeleted:false,
                    isChildEligibleForDiscount: true
                    // [operator.or]:[
                    //     {
                    //         isSiblingDiscountEnabled: true
                    //     },
                    //     {
                    //         isStaffDiscountEnabled: true
                    //     }
                    // ]
                } 
            }   
        }
        let isRequired = false

        let isFetchingWithGuardians = false
        if (fetchType === "dropdown") {
            query.where.status = true;
            if (search) {
                filterBy.search(query, "firstName", search);
            }
            // attributes = ["id", "name", "registrationNumber"]
            result = await database.fetchWithSorting(models.child, query, null, "firstName", "ASC");
        }
        else {
            const days =  ["monday", "tuesday", "wednesday", "thursday", "friday" , "saturday", "sunday"];
            const currentDay = moment().isoWeekday() - 1;
        
            if ('attributes' in req.query)
                roomFilter = JSON.parse(attributes).find(item => item.key === "roomId");

            if ('otherAttributes' in req.query){
                bookedStudents = JSON.parse(otherAttributes).find(item => item.key === "bookedStudents");
                takeAttendance = JSON.parse(otherAttributes).find(item => item.key === "takeAttendance");
                currentSessionAttendance = JSON.parse(otherAttributes).find(item => item.key === "sessionId");
            }

            // console.log("filterResultInnerQuery",filterResultInnerQuery);
            if (search) {
                // filterBy.search(filterResult,"firstName", search);
                filterBy.searchOnMultipleFields(query, ["firstName", "lastName"], search);
            }
            if(parentName)
            {
                isRequired = true
                filterBy.search(query_v2, "name", parentName);
            }
            // if(!parentName)
            // {
            //     filterResult = filterBy.filter_v2(req, query);
            // }
            // else{
            //     filterResult = query//{...query}
            // }

            filterResult = filterBy.filter_v2(req, query);


            console.log('== >> filterResult == >> ',filterResult)


            countQuery = { ...filterResult };
            const paginationResult = pagination.offsetPagination(req, filterResult);
            console.log(paginationResult);
            console.log("takeAttendance",takeAttendance);
            if ((takeAttendance && (takeAttendance['value']) === true)){
                let bookedStudents = JSON.parse(otherAttributes).find(item => item.key === "bookedStudents");
           
                // const currentDay = moment().isoWeekday() - 1;
                console.log("->== = == = = = = = === ",days[currentDay]);
                roomId = JSON.parse(attributes).find(item => item.key === "roomId");
                  
                // Mujtaba bro code not working 
                //if (currentSessionAttendance && parseInt(currentSessionAttendance['value'] > 0) ){
                
                //Usman Khalid code + added profilePicturePath key in attributes
                if (currentSessionAttendance ){
                    //changed by usman asked by usman habib child day check removed
                    //takeAttendanceQuery = {day:days[currentDay] , sessionId: currentSessionAttendance['value'], isDeleted: false }
                    takeAttendanceQuery = {sessionId: currentSessionAttendance['value'], isDeleted: false }
                    result = await database.fetchWithScope(models.child, [{ method: ['childBookingSessionDetail', takeAttendanceQuery   ] }], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth','profilePicturePath']);        
                }
                else{
                    //changed by usman asked by usman habib child day check removed
                    //takeAttendanceQuery = {day:days[currentDay] , sessionId: {[operator.ne]: null}, isDeleted: false }
                    takeAttendanceQuery = { sessionId: {[operator.ne]: null}, isDeleted: false }
                    result = await database.fetchWithScope(models.child, [{ method: ['childBookingSessionDetail',   takeAttendanceQuery ] }], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth','profilePicturePath']);        
                    //console.log('result===>',result.length)
                }
     }
            
                else if (roomFilter && (bookedStudents && (bookedStudents['value']) === true))
                result = await database.fetchWithScope(models.child, ['activeBookingWrtRoom'], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'roomId' , 'branchId']);
            
                else if (roomFilter )
                result = await database.fetchWithScope(models.child, ['room'], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'roomId' , 'branchId']);
          
                else if ((bookedStudents && (bookedStudents['value']) === true))
                result = await database.fetchWithScope(models.child, ['activeBookingWrtRoom'], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'roomId' , 'branchId']);
                // result = await database.fetchWithScope(models.child, ['activeBooking'], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'roomId' , 'branchId']);
          
                else
                {
                    console.log('=========== LAST ELSE =============',paginationResult)
                // result = await database.fetchWithScope(models.child, ["branch", "room"], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'roomId', 'branchId']);
                    delete attributes.activeBooking;
                    isFetchingWithGuardians = true
                    //result = await database.fetchWithScope(models.child, ["branch_v2"], paginationResult, ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'roomId', 'branchId']);
                    result = await database.fetchWithScope(models.child, [{ method: ['branch_v2', query_v2.where,isRequired] }], paginationResult);
                    console.log('=========== LAST ELSE =============')

                }
        }
        let data;
        if (fetchType === "dropdown") {
            data = result;
        }
        else {
            console.log("countQuery", countQuery);

            if ((takeAttendance && (takeAttendance['value']) === true) && roomFilter){
                console.log('=========> IN FIRST CONDITION=================>')

                console.log("takeAttendanceQuery",takeAttendanceQuery);
                
                console.log('=========> THE QUEREY IS=================>')


                // working count
                count = await models.child.count({
                    include:[
                        {
                            model: models.childBookingDetail,
                            as: 'childBookingDetail',
                            required: true,
                            where:{
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
                        
                            },
                            attributes: ['id','joiningDate','leavingDate'],
                            
                        },
                        {
                            model: models.childAttendance,
                            as: 'childAttendance',
                            required: false,
                            where: { createdDate: moment(moment().unix() * 1000).format('YYYY-MM-DD') },
                        },
                        {
                            model: models.room,
                            as: 'room',
                            required: true, 
                            attributes: ["id", "name"],
                            where: {status: true, isDeleted: false},
                        },
                    ],
                    where: countQuery.where,
                    group: ['child.id']
                })
                // discuss
                count = count.length
            }

            else if ((takeAttendance && (takeAttendance['value']) === true)){
                console.log('=========> IN ELSE=================>')

                console.log("takeAttendanceQuery",takeAttendanceQuery);
              
                count = await database.countWithAssociation(models.child, countQuery.where, [
                    {
                        model: models.childBookingDetail,
                        as: 'childBookingDetail',
                        required: true,
                        where:{
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
                    
                        },
                        attributes: ['id','joiningDate','leavingDate'],
                        // commented by usman because, day check is removed
                        include:[
                            {
                                model: models.childBookingSessionDetail,
                                as: 'childBookingSessions',
                                //required: true, // required false because day check removed
                                required: false,
                                where: takeAttendanceQuery,
                            },
                
                        
                
                        ]
                    },
                    {
                        model: models.childAttendance,
                        as: 'childAttendance',
                        //Mujtaba bro code
                        //required: true,
                        //Usman Khalid Code beacuase there could be any student whose attendace is not yet marked
                        required: false,
                        where: { createdDate: moment(moment().unix() * 1000).format('YYYY-MM-DD') },
                    }
                  
                ]);
                // This line is added because the day check is removed and returns 5 sessions of a child
                //count = result.length;
                // count = count/5;
            }
            //Mujtaba bro code here is 
            // Only if condition which also execute roomFilter condition solution 1
            else if (roomFilter && (bookedStudents && (bookedStudents['value']) === true)) {
                count = await database.countWithAssociation(models.child, countQuery.where, [
                    {
                        model: models.childBookingDetail,
                        as: 'childBookingDetail',
                        required: true, 
                        attributes: ["id"],
                        where: {status: true, isDeleted: false , 
                            // commented by usman, room mei listing sahi nahi aa rahi
                            // [operator.or]: [  
                            // {
                            //     leavingDate:{
                            //         [operator.gte]: moment().format('YYYY-MM-DD')
                            //     },      
                            // }, 
                            // {
                            //     leavingDate: {[operator.eq]: null}
                            // },
                            
                            // ] 
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
                    },
                        
                    },
                    {
                        model: models.room,
                        as: 'room',
                        required: true, 
                        attributes: ["id", "name"],
                        where: {status: true, isDeleted: false},
                    }
                ]);
                }
            // solution 2 is 
            // else if(roomFilter && !(takeAttendance && (takeAttendance['value']) === true))
           else if (roomFilter) {
                count = await database.countWithAssociation(models.child, countQuery.where, [
                    {
                        model: models.room,
                        as: 'room',
                        required: true,
                        // where: countQuery.where,
                    }]);

            }
            else  if ((bookedStudents && (bookedStudents['value']) === true)) {
                console.log('==== >>>> second last if === >> ')
                // change by usman khalid, due to multiple bookings
                // count = await database.countWithAssociation(models.child, countQuery.where, [
                //     {
                //         model: models.childBookingDetail,
                //         as: 'childBookingDetail',
                //         required: true,
                //         where: {status: true, isDeleted: false , [operator.or]: [  
                //             {
                //                 leavingDate:{
                //                     [operator.gte]: moment().format('YYYY-MM-DD')
                //                 },      
                //             }, 
                //             {
                //                 leavingDate: {[operator.eq]: null}
                //             },
                            
                //         ]}
                // }]);

                const query_v2 = {...countQuery}
                query_v2.where['activeBooking'] = true
                count = await database.count(models.child,query_v2.where);
                console.log('==== >>> count === > ',count)

            }

            
            else{
                
                console.log('===== >> IN LAST ELSE CONDITION === >> ::')
                
                if(isFetchingWithGuardians)
                {

                    count = await models.child.count({
                        include:[
                            {
                                model: models.branch,
                                as: 'branch',
                                required: true,
                                attributes: ["id", "name"],
                                where: {
                                    status: true
                                },
                            },
                            {
                                model: models.childGuardianDetail,
                                as: 'childGuardianDetails',
                                required: isRequired,
                                //attributes: ["id", "name"],
                                where: query_v2.where
                            },
                        ],
                        where: countQuery.where,
                    })

                    //count = result.length

                }
                else{
                    count = await database.count(models.child, countQuery.where);
                }




                // count = await database.countWithAssociation(models.child, countQuery.where, [ 
                //     {
                //         model: models.room,
                //         as: 'room',
                //         required: true, 
                //         attributes: ["id", "name"],
                //         where: {status: true, isDeleted: false},
                //     }
                // ]);

            }
                // count = await database.count(models.child, countQuery.where);

            const cursorPagination = pagination.cursor(req, count);
            data = {
                listing: result,
                pagination: cursorPagination
            };
        }
        response.send(
            req,
            res,
            next,
            "info",
            200,
            "FETCH_SUCCESSFULLY",
            data
        );

    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
};

/**
 * Controller: DETAIL OF A SINGLE RECORD .
 */
const find = async (req, res, next) => {
    try {
        const childId = req.params.id;
        const result = await database.findByIdWithScope(models.child, ['childDetails'], childId);
        if (result) {
            return response.send(req, res, next, "info", 200, "FETCH_SUCCESSFULLY", result);
        }
        else {
            response.send(req, res, next, "warning", 202, "DATA_NOT_AVAILABLE", null);
        }
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        })
    }
}

/**
 * Controller: It is used to update admin.
 */
const update = async (req, res, next) => {
    try {
        const childId = req.params.id;
        const child = await database.findById(models.child, childId);
        if (child) {
            const dataAvailabilityResult = await isDataAvailable(req);
            if (!dataAvailabilityResult) {
                return response.send(req, res, next, "warning", 202, "DATA_NOT_AVAILABLE", null);
            }

            const childResult = await manageChild(req, child);
            if (childResult) {
                req.body.childId = childId;
                let childPreviousNurseryDetailResult;
                const childPreviousNurseryDetails = await database.findBy(models.childPreviousNursery, { childId: childId })
                if (childPreviousNurseryDetails) {
                    childPreviousNurseryDetailResult = await manageChildPreviousNurseryDetail(req, childPreviousNurseryDetails);
                }
                let result = Object.assign({}, childResult.dataValues);
                result["childPreviousNurseryDetail"] = childPreviousNurseryDetailResult;
                response.send(req, res, next, "info", 200, "CHILD_UPDATED", result);
            }
        }
        else {
            response.send(req, res, next, "warning", 202, "DATA_NOT_AVAILABLE", null);
        }
    } catch (error) {
        console.log(error)
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
}

/**
 * Controller: UPDATE STATUS OF A SINGLE RECORD.
 */
const updateStatus = async (req, res, next) => {
    try {
        const childId = req.params.id;
        const { status } = req.body;
        const child = await database.findById(models.child, childId);
        if (child) {
            child.status = status;
            child.updatedTime = moment().unix();
            const result = await database.save(child);
            if (result) {
                if (!result.status) {
                    const action = { status: 0 };
                    const where = {
                        childId: childId
                    };
                    await database.bulkUpdate(models.childPreviousNursery, action, where);
                }
                response.send(req, res, next, "info", 200, "CHILD_STATUS_UPDATED", result);
            }
        }
        else {
            response.send(req, res, next, "warning", 202, "DATA_NOT_AVAILABLE", null);
        }
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
}

/**
 * Controller: REMOVE A RECORD.
 */
const remove = async (req, res, next) => {
    try {
        const childId = req.params.id;
        const child = await database.findById(models.child, childId);
        if (!child) {
            response.send(req, res, next, "warning", 202, "DATA_NOT_AVAILABLE", null);
        }
        const result = await database.remove(models.child, childId);
        if (result) {
            const action = { isDeleted: 1, deletedTime: moment().unix() };
            const where = {
                childId: childId
            };
            await database.bulkUpdate(models.childPreviousNursery, action, where);
            response.send(req, res, next, "info", 200, "CHILD_REMOVED", null);
        }
        else {
            response.send(req, res, next, "warning", 202, "DATA_NOT_AVAILABLE", null);
        }
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
}



/**
 * Controller: It is used yo fetch child name and their first guardians.
 */
 const fetch_v2 = async (req, res, next) => {
    try {
        const {branchId} = req.query;
        let query={
            where:{
                branchId: branchId
            }
        }
        // if they want name is order by asc
        //const result = await database.fetchWithScope_v3(models.child, [{ method: ['childGuardianDetail'] }], query, ['id', 'firstName', 'lastName'],"firstName");        
        const result = await database.fetchWithScope(models.child, [{ method: ['childGuardianDetail'] }], query, ['id', 'firstName', 'lastName']);        
        response.send(
            req,
            res,
            next,
            "info",
            200,
            "FETCH_SUCCESSFULLY",
            result
        );
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
}



/*******************************************************/
// Exporting Controllers.
/*******************************************************/
module.exports = {
    add,
    fetch,
    fetch_v2,
    fetch_v3,
    fetch_v4,
    find,
    update,
    updateStatus,
    remove,
}
/*******************************************************/
// Internal Functions.
/*******************************************************/

/**
 * Function: It is manage child.
 */
const manageChild = async (req, child) => {
    const { firstName, lastName, branchId, dateOfBirth, gender} = req.body;
    child.firstName = firstName;
    child.lastName = lastName;
    child.branchId = branchId;
    child.gender = gender;
    child.dateOfBirth = dateOfBirth;
    if (child.createdTime) {
        child.updatedTime = moment().unix();
    } else {
        child.createdTime = moment().unix();
        child.updatedTime = moment().unix();
    }
    return await database.save(child);
}

/**
 * Function: DATA AVAILABILITY BEFORE ADDING RESOURCE.
 */
const isDataAvailable = async (req) => {
    const { branchId } = req.body;
    const isBranchAvailable = await database.findById(models.branch, branchId);

    if (isBranchAvailable)
        return true;
    else
        return false;

}


