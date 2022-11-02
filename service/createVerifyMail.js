const { BASE_URL } = process.env;

const createVerifyMail = (email, verificationToken) => {
    return {
        to: email,
        subject: "Confirm registration",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Push to confirm</a>`
    }
}

module.exports = createVerifyMail;