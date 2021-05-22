const Sequilize = require('sequelize')
const db = require('../db/connection')

const Pelicula = db.define('peliculas', {
    titulo: {
        type: Sequilize.DataTypes.STRING
    },
    fecha: {
        type: Sequilize.DataTypes.INTEGER
    },
    calificacion: {
        type: Sequilize.DataTypes.STRING
    },
    imagen: {
        type: Sequilize.DataTypes.BLOB("medium")
    }
});

module.exports = Pelicula;