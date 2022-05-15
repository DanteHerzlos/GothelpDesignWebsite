const User = require('../models/user')
const bcrypt = require('bcrypt')
const config = require('config')


const createDefaultUser = async () => {
    try {
        const users = await User.findAll({limit: 1})
        if(users.length === 0){
            const hashPassword = await bcrypt.hash(config.get('DEFAULT_USER_PASSWORD') ,10)
            const deafaultUser = {
                name: config.get('DEFAULT_USER_NAME'),
                email: config.get('DEFAULT_USER_MAIL'),
                encryptedPassword: hashPassword
            }
            await User.create(deafaultUser)
            console.log('Default user was created');
        }
        console.log('User already created');

    } catch (e) {
        console.log(e);
    }
}

module.exports = createDefaultUser