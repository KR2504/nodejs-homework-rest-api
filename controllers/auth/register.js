const bcrypt = require('bcryptjs')

const { User, schemas } = require('../../models/user');

const { RequestError } = require('../../helpers');

const { createVerifyMail, sendEmail } = require('../../service')

const { nanoid } = require('nanoid');

const gravatar = require('gravatar');

const register = async(req, res, next) => {
    try {
        const { error } = schemas.registerSchema.validate(req.body);
        if (error) {
            throw RequestError(400)
        }

        const { email, password, subscription } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw RequestError(409, "Email in use")
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email)
        const verificationToken = nanoid();

        await User.create({ email, password: hashPassword, subscription, avatarURL, verificationToken });

        const mail = createVerifyMail(email, verificationToken)

        await sendEmail(mail);

        res.status(201).json({
            email,
            subscription,
            verificationToken,
        })
    } catch (error) {
        next(error);
    }
}

module.exports = register;