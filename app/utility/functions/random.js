/*******************************************************/
//Implementing Random Functions.
/*******************************************************/
const getRandomString = (text) => {
    return text + Math.floor((Math.random() * 100000) + 1);
};

const getRandomInt = () => {
    return Math.floor((Math.random() * 100000) + 1);

};
const getRandomAmount = () => {
    return ((Math.random() * 100) + 1).toFixed(2);
};
const getDate = () => {
    return (new Date()).toISOString().substring(0, 10);
};

/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
    getRandomString,
    getRandomInt,
    getRandomAmount,
    getDate
};
