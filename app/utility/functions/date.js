/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const moment = require("moment");

/*******************************************************/
// Global Variables.
/*******************************************************/
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const today = new Date();

/*******************************************************/
// Implementing Dates.
/*******************************************************/


const upComingWeekDates = () => {
    let nextWeekDates = [];
    let nextWeekDate, fullDate, splitingDate;
    for (let i = 7; i < 14; i++) {
        nextWeekDate = setToMonday(new Date());
        nextWeekDate.setDate(nextWeekDate.getDate() + i);
        fullDate = String(nextWeekDate);
        splitingDate = fullDate.split(" ")
        let monthNumber = parseInt(months.indexOf(splitingDate["1"])) + 1
        if (monthNumber < 10)
            monthNumber = "0" + monthNumber

        // console.log(monthNumber);
        // date = splitingDate["2"] + "-" + splitingDate["1"] + "-" + splitingDate["3"]
        date = splitingDate["3"] + "-" + monthNumber + "-" + splitingDate["2"]
        // date = splitingDate["2"] + "-" + monthNumber + "-" + splitingDate["3"]
        // console.log(splitingDate["1"]);
        nextWeekDates.push(date);
    }

    return nextWeekDates;
};

const weekRemainingDays = (startingIndex, endingIndex) => {
    let nextWeekDates = [];
    let nextWeekDate, fullDate, splitingDate;
    for (let i = startingIndex; i < endingIndex; i++) {
        nextWeekDate = setToMonday(new Date());
        nextWeekDate.setDate(nextWeekDate.getDate() + i);
        fullDate = String(nextWeekDate);
        splitingDate = fullDate.split(" ")
        let monthNumber = parseInt(months.indexOf(splitingDate["1"])) + 1
        if (monthNumber < 10)
            monthNumber = "0" + monthNumber

        // console.log(monthNumber);
        // date = splitingDate["2"] + "-" + splitingDate["1"] + "-" + splitingDate["3"]
        date = splitingDate["3"] + "-" + monthNumber + "-" + splitingDate["2"]
        // date = splitingDate["2"] + "-" + monthNumber + "-" + splitingDate["3"]
        // console.log(splitingDate["1"]);
        nextWeekDates.push(date);
    }

    return nextWeekDates;
};
const setToMonday = (date) => {
    let day = date.getDay() || 7;
    if (day !== 1)
        date.setHours(-24 * (day - 1));
    return date;
}

const dateOfDay = (day) => {
    const index = days.indexOf(day);
    const date = new Date();
    const currentDay = date.getDay();
    const difference = date.getDate() - currentDay + (currentDay == 0 ? -6 : index);
    return new Date(date.setDate(difference));
}

const getIndexOfDay = (day) => {
    return days.indexOf(day);
}

const getDayFromIndex = (index) => {
    return days[index];
}
const getCurrentDate = () => {
    return (new Date()).toISOString().substring(0, 10);
};

const parseDate = (date) => {
    console.log("THE DATE :::", date);
    const extractDate = date.split(" ")
    let monthNumber = parseInt(months.indexOf(extractDate["1"])) + 1
    if (monthNumber < 10)
        monthNumber = "0" + monthNumber

    const parseDate = extractDate["3"] + "-" + monthNumber + "-" + extractDate["2"]
    return parseDate;
};

const getDay = () => {
    return moment().isoWeekday()
    //    return today.getDay(); 
}

/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
    upComingWeekDates,
    weekRemainingDays,
    dateOfDay,
    getCurrentDate,
    getIndexOfDay,
    parseDate,
    getDay,
    getDayFromIndex
};
