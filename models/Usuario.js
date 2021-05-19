const Sequilize = require('sequelize')
const db = require('../db/connection')

const Usuario = db.define('usuarios', {

    email: {
        type: Sequilize.DataTypes.STRING
    },
    password: {
        type: Sequilize.DataTypes.STRING
    }
})


module.exports = Usuario;