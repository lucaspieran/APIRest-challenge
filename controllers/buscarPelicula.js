const { request, response } = require("express");
const { Op } = require("sequelize");
const Pelicula = require("../models/Pelicula");

const buscarPelicula = async (req = request, res = response) => {


    const { name = '', age = '', movie = '' } = req.query;

    const pelicula = await Pelicula.findAll({
        where: {
            titulo: { [Op.like]: '%' + name + '%' }
        }
    })

    res.status(200).json({
        pelicula
    })
}


module.exports = {
    buscarPelicula
}