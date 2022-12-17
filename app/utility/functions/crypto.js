/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const crypto = require('crypto');
require("dotenv").config();

/*******************************************************/
// Declaring Variables.
/*******************************************************/
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const type = "hex";
/*******************************************************/
// Implementing Crypto encrypt & decrypt.
/*******************************************************/
const encrypt =  (text) => {
    const cipher = crypto.createCipheriv(process.env.CRYPTO_ALGORITHM, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString(type) + ':' + iv.toString(type) + '=' +
        key.toString(type);
}

const decrypt =  (text) => {
    console.log("Hello", text);
    let iv = Buffer.from((text.split(':')[1]).split('=')[0], type)//will return iv;
    let enKey = Buffer.from(text.split('=')[1], type)//will return key;
    let encryptedText = Buffer.from(text.split(':')[0], type);//returns encrypted Data
    let decipher = crypto.createDecipheriv(process.env.CRYPTO_ALGORITHM, Buffer.from(enKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
    encrypt,
    decrypt
}