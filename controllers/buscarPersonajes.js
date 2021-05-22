const { request, response } = require("express");
const { Op } = require("sequelize");
const Personaje = require("../models/Personaje");


const buscarPersonajes = async (req = request, res = response) => {


    const { name = '', age = '', movie = '' } = req.query;

    const personaje = await Personaje.findAll({
        where: {
            nombre: { [Op.like]: '%' + name + '%' },
            edad: { [Op.like]: '%' + age + '%' },
            peliculas_asociadas: { [Op.like]: '%' + movie + '%' }
        }
    })

    res.status(200).json({
        personaje
    })
}


module.exports = {
    buscarPersonajes
}