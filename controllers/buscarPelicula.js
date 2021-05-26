const { request, response } = require("express");
const { Op } = require("sequelize");
const Pelicula = require("../models/Pelicula");

const buscarPelicula = async (req = request, res = response) => {


    const { name = ''} = req.query;

    const pelicula = await Pelicula.findAll({
        where: {
            nombre: { [Op.like]: '%' + name + '%' },
        }
    })

    res.status(200).json({
        pelicula
    })
}


module.exports = {
    buscarPelicula
}