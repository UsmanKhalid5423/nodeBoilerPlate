/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const { Parser } = require("json2csv");
const csv = require("fast-csv");
const fs = require("fs-extra");

/*******************************************************/
// Implementing Password Encryption & Comparison.
/*******************************************************/
const read = async file => {
  return new Promise((resolve, reject) => {
    let csvArray = [];
    fs.createReadStream(file)
      .pipe(csv.parse({ headers: true }))
      .on("data", async csvrow => {
        csvArray.push(csvrow);
      })
      .on("end", async () => {
        return resolve(csvArray);
      });
  });
};

const create =  (fields, data) => {
  const csv = new Parser(fields);
  return csv.parse(data);
};

/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
  read,
  create
};
