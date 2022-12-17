/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const _ = require('lodash');

/*******************************************************/
//Lodash Functions.
/*******************************************************/
const unique = (array) => {
    return _.uniq(array).length !== array.length
}

const include = (items, searchBy, search) => {
    return _.filter(items, x => _.includes(searchBy, search))
}

const arraySorting = (items, sortBy, order) => {
    let sortedArray;
    if (order === "ASC")
        sortedArray = _.sortBy(items, sortBy);

    else if (order === "DESC")
        sortedArray = _.sortBy(items, sortBy).reverse();

    return sortedArray;

}

const difference = (arrayOne, arrayTwo) => {
    return _.difference(arrayOne, arrayTwo)
}


// Method by Usman
const intersection = (arrayOne, arrayTwo) => {
    return _.intersection(arrayOne, arrayTwo)
}
const intersectionBy = (arrayOne, arrayTwo, key) => {
    return _.intersectionBy(arrayOne, arrayTwo, key)
}

const differenceBy = (arrayOne, arrayTwo,key) => {
    return _.differenceBy(arrayOne, arrayTwo,key)
}

const findLastIndex = (array,condition) => {
    return _.findLastIndex(array, condition);
}

// Added by usman
// const differenceBy = (arrayOne, arrayTwo,key) => {
//     return _.differenceBy(arrayOne, arrayTwo,key)
// }
/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
    unique,
    include,
    arraySorting,
    difference,
    intersection,
    intersectionBy,
    differenceBy,
    findLastIndex,
};