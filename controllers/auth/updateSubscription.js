const { User, schemas } = require('../../models/user');

const { RequestError } = require('../../helpers');

const updateSubscription = async(req, res, next) => {
    try {
        const { error } = schemas.updateSubscriptionSchema.validate(req.body);
        if (error) {
            throw RequestError(400, "Invalid field value, please write one of these value: starter, pro, business")
        }
        const { _id } = req.user;
        const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
        if (!result) {
            throw RequestError(404, "Not found")
        }
        res.json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = updateSubscription;