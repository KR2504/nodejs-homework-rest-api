const bcrypt = require('bcryptjs')

const { User, schemas } = require('../../models/user');

const { RequestError } = require('../../helpers');

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
        await User.create({ email, password: hashPassword, subscription });
        res.status(201).json({
            email,
            subscription
        })
    } catch (error) {
        next(error);
    }
}

module.exports = register;