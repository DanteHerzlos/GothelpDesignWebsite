const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const service = sequelize.define('Service', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    position:{
        allowNull: false,
        type: Sequelize.INTEGER
    },
    title: {
        allowNull: true,
        type: Sequelize.STRING
    },
    body: {
        allowNull: true,
        type: Sequelize.STRING
    },
    imgPath: {
        allowNull: false,
        type: Sequelize.STRING
    }
})

module.exports = service