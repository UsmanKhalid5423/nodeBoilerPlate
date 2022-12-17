
const termHolidaysType = {
    bankHolidays: "Bank Holiday",
    midTermHolidays: "Term Holiday",
    endTermHolidays: "Term Holiday"
}



module.exports = function (key) {
    return termHolidaysType[key];
  };
  
  
