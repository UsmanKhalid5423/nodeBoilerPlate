
const additinalItemsConstants = {
    birthdayCake: "Birthday Cake",
    lateCollectionFee: "Late Collection Fee",
    lunch: "Lunch",
    nappyChange: "Nappy Change",
    registrationFee: "Registration Fee",
    tea: "Tea",
    sunCream: "Sun Cream",
    costume: "Costume",
    breakage: "Breakage",
    latePaymentCharge: "Late Payment Charge",
    packedMeal: "Packed Meal",
    adjustment: "Adjustment",
    termTimeOnlySurcharge: "Term Time Only Surcharge",
}

// const getAttionalItemName = function (key) {
//     return additinalItemsConstants[key];
// }


module.exports = function (key) {
    return additinalItemsConstants[key];
  };


