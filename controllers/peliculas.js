const { response, request } = require("express");
const Pelicula = require("../models/Pelicula");


//obtener peliculas
const obtenerPeliculas = async (req = request, res = response) => {

    const pelicula = await Pelicula.findAll({ attributes: ['titulo', 'imagen', 'createdAt'] });

    res.status(200).json(pelicula)


}

//crear peliculas
const crearPelicula = async (req = request, res = response) => {

    const { titulo, ...body } = req.body;

    const tituloDb = await Pelicula.findOne({ where: { titulo } })

    if (tituloDb) {
        return res.status(400).json({
            msg: `El nombre ${titulo} ya se encuentra registrado`
        })
    }

    const data = {
        titulo,
        ...body
    }
    const pelicula = new Pelicula(data);

    //guardar en db
    await pelicula.save();
    res.status(200).json(pelicula)
}

//actualizar pelicula
const actualizarPelicula = async (req = request, res = response) => {
    const { id } = req.params;
    const { body } = req;

    try {

        const pelicula = await Pelicula.findByPk(id)
        if (!pelicula) {
            return res.status(404).json({
                msg: "No existe pelicula con ese Id " + id
            })
        }

        await pelicula.update(body);


        res.json(pelicula)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }

}

//eliminarPelicual

const eliminarPelicula = async (req = request, res = response) => {
    const { id } = req.params;


    //eliminacion fisica
    const pelicula = await Pelicula.findByPk(id)
    if (!pelicula) {
        return res.status(404).json({
            msg: "No existe pelicula con ese Id " + id
        })
    }
    await pelicula.destroy();

    res.json(pelicula);
}




module.exports = {
    obtenerPeliculas,
    crearPelicula,
    actualizarPelicula,
    eliminarPelicula
}