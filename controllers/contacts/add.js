const { Contact, schemas } = require('../../models/contact');

const { RequestError } = require('../../helpers');

const add = async(req, res, next) => {
    try {
        const { error } = schemas.addSchema.validate(req.body);
        if (error) {
            throw RequestError(400, "missing required name field")
        }
        const result = await Contact.create(req.body);
        res.status(201).json(result)
    } catch (error) {
        next(error);
    }
};

module.exports = add;