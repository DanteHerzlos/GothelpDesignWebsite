const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const User = require('./user')

const token = sequelize.define('Token', {
    user: {
        type: Sequelize.INTEGER,
        reference: {
            model: User,
            key: 'id'
        }
    },
    refreshToken: {
        allowNull: false,
        type: Sequelize.STRING
    }
})

module.exports = token