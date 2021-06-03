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

    const pelicula = new Pelicula(req.body);

    if (tituloDb) {
        return res.status(400).json({
            msg: `El nombre ${titulo} ya se encuentra registrado`
        })
    }

    if (req.file) {
        pelicula.imagen = req.file.filename
    } else {
        return res.status(400).json({
            msg: "Debes elegir una imagen"
        })
    }

    //guardar en db
    await pelicula.save();
    res.status(200).json(pelicula)
}

//actualizar pelicula
const actualizarPelicula = async (req = request, res = response) => {
    const { id } = req.params;
    const nuevaPelicula = req.body

    try {

        const pelicula = await Pelicula.findByPk(id)
        if (!pelicula) {
            return res.status(404).json({
                msg: "No existe pelicula con ese Id " + id
            })
        }

        //verificar si hay nueva imagen
        if (req.file) {
            nuevaPelicula.imagen = req.file.filename
        } else {
            nuevaPelicula.imagen = pelicula.imagen
        }

        await pelicula.update(nuevaPelicula);


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