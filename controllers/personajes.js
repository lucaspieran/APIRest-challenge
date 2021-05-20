const { response, request } = require('express');
const Personaje = require('../models/Personaje');


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

}

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

    res.json(personaje);

    //Eliminacion logica: se agregaria una fila de estado a la tabla para cambiarla de true a false y asi no eliminarlo por completo

}

module.exports = {
    crearPersonaje,
    actualizarPersonaje,
    eliminarPersonaje
}