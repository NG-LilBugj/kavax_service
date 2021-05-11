const bcrypt = require('bcrypt');

module.exports = {

    generateHash: (userInfo) => {
        const salt = bcrypt.genSaltSync(process.env.SALT_ROUNDS);
        const hash = bcrypt.hashSync(userInfo.password, salt);
        return {
            email: userInfo.email,
            first_name: userInfo.username,
            password: hash
        }
    },

    verifyHash: ({ password }, hash) => {
        return bcrypt.compareSync(password, hash)
    }
}
