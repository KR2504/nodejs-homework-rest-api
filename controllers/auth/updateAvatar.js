const fs = require('fs/promises')
const path = require('path')
const jimp = require("jimp");
const { User } = require('../../models/user');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async(req, res, next) => {
    try {

        const { _id } = req.user;
        const { path: tempUpload, originalname } = req.file;
        const extention = originalname.split('.').pop();
        const fileName = `${_id}.${extention}`

        jimp.read(tempUpload)
            .then(avatarResize => avatarResize.resize(250, 250).write(resultUpload))
            .catch(error => {
                console.error(error);
            });

        const resultUpload = path.join(avatarDir, fileName)
        await fs.rename(tempUpload, resultUpload);

        const avatarUrl = path.join('avatars', fileName);
        await User.findByIdAndUpdate(_id, { avatarUrl });

        res.json({ avatarUrl })

    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }
}

module.exports = updateAvatar;