const Sequilize = require('sequelize')
const db = require('../db/connection')


const Personaje = db.define('personajes', {
    nombre: {
        type: Sequilize.DataTypes.STRING
    },
    edad: {
        type: Sequilize.DataTypes.STRING
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
        type: Sequilize.DataTypes.STRING
    },
})

module.exports = Personaje;