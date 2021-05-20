const Sequilize = require('sequelize')
const db = require('../db/connection')


const Personaje = db.define('personajes', {
    nombre: {
        type: Sequilize.DataTypes.STRING
    },
    edad: {
        type: Sequilize.DataTypes.INTEGER
    },
    peso: {
        type: Sequilize.DataTypes.STRING
    },
    historia: {
        type: Sequilize.DataTypes.STRING
    },
    peliculas_asociadas: {
        type: Sequilize.DataTypes.STRING
    },
    imagen: {
        type: Sequilize.DataTypes.BLOB("long")
    },
})

module.exports = Personaje;