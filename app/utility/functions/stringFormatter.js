/*******************************************************/
// Formating the string.
/*******************************************************/
const capitalization = string => {
  let splitString = string.toLowerCase().split(" ");
  for (let i = 0; i < splitString.length; i++) {
    splitString[i] =
      splitString[i].charAt(0).toUpperCase() +
      splitString[i].substring(1).toLowerCase();
  }
  return splitString.join(" ");
};


String.prototype.toUrduDigits = function () {
  let id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return this.replace(/[0-9]/g, function (w) {
    return id[+w]
  });
}
/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
  capitalization
};
