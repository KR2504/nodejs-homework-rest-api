const { Contact } = require('../../models/contact');

const { RequestError } = require('../../helpers');

const removeById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Contact.findByIdAndRemove(id)
        if (!result) {
            throw RequestError(404, "Not found")
        }
        res.json({ message: 'contact deleted' })
    } catch (error) {
        next(error);
    }
};

module.exports = removeById;