const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const { User, schemas } = require('../../models/user');

const { RequestError } = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async(req, res, next) => {
    try {
        const { error } = schemas.loginSchema.validate(req.body);
        if (error) {
            throw RequestError(400)
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw RequestError(401, "Email or password is wrong")
        }

        if (!user.verify) {
            throw RequestError(401, "Email not verify")
        }

        const passwordCompare = bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            throw RequestError(401, "Email or password is wrong")
        }
        const payload = {
            id: user._id,
        }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
        await User.findByIdAndUpdate(user._id, { token })
        res.status(200).json({
            email,
            token
        })
    } catch (error) {
        next(error);
    }
}

module.exports = login;