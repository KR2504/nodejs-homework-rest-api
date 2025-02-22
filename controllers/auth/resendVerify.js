const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');
const { createVerifyMail, sendEmail } = require('../../service')

const resendVerify = async(req, res, next) => {
    const { email } = req.body;
    const { verificationToken } = await User.findOne({ email });
    if (!email) {
        throw RequestError(400, "Missing required field email")
    }

    const mail = createVerifyMail(email, verificationToken)
    await sendEmail(mail)

    res.status(200).json({
        message: "Verification email sent"
    })
}

module.exports = resendVerify;