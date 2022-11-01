const RequestError = require('./RequestError');
const sendMail = require('./sendEmail');
const createVerifyMail = require('./createVerifyMail')

module.exports = {
    RequestError,
    sendMail,
    createVerifyMail,
}