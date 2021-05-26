const { response, request } = require('express');
const Personaje = require('../models/Personaje');
const fs = require('fs')


//obtener personajes

const obtenerPesonajes = async (req = request, res = response) => {

    const personajes = await Personaje.findAll({ attributes: ['nombre', 'imagen'] });

    res.status(200).json(personajes)
}

//detalle de personaje

const detallePersonaje = async (req = request, res = response) => {
    const { id } = req.params;

    const detallePj = await Personaje.findByPk(id)

    res.json(detallePj)


}

const crearPersonaje = async (req = request, res = response) => {

    const { nombre, ...body } = req.body;

    const nombreDB = await Personaje.findOne({ where: { nombre } })

    if (nombreDB) {
        return res.status(400).json({
            msg: `El nombre ${nombre} ya se encuentra registrado`
        })
    }

    const data = {
        nombre,
        ...body
    }
    const personaje = new Personaje(data);

    //guardar en db
    await personaje.save();
    res.status(200).json(personaje)

    // try {

    //     console.log(req.file)
    //     if (req.file == undefined) {
    //         return res.send(`debes seleccionar un archivo`);
    //     }

    //     Personaje.create({
    //         type: req.file.mimetype,
    //         imagen: req.file.originalname,
    //         imagen: fs.readFileSync(
    //             __basedir + "/public/images" + req.file.filename
    //         ),
    //     }).then((image) => {
    //         fs.writeFileSync(
    //             __basedir + "/public/tmp" + image.name,
    //             image.imagen
    //         )

    //         return res.send("file upload")
    //     })

    // } catch (error) {
    //     console.log(error)
    // }


}

//actualizar personaje

const actualizarPersonaje = async (req = request, res = response) => {
    const { id } = req.params;
    const { body } = req;

    try {

        const personaje = await Personaje.findByPk(id)
        if (!personaje) {
            return res.status(404).json({
                msg: "No existe personaje con ese Id " + id
            })
        }

        await personaje.update(body);


        res.json(personaje)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }

}

//eliminar personaje

const eliminarPersonaje = async (req = request, res = response) => {
    const { id } = req.params;


    //eliminacion fisica
    const personaje = await Personaje.findByPk(id)
    if (!personaje) {
        return res.status(404).json({
            msg: "No existe personaje con ese Id " + id
        })
    }
    await personaje.destroy();

    res.json({ msg: "Eliminado" });

    //Eliminacion logica: se agregaria una fila de estado a la tabla para cambiarla de true a false y asi no eliminarlo por completo

}

module.exports = {
    crearPersonaje,
    actualizarPersonaje,
    eliminarPersonaje,
    obtenerPesonajes,
    detallePersonaje

}