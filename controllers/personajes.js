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
    res.status(201).json(personaje)

}

const actualizarPersonaje = async (req = request, res = response) => {
    const { id } = req.params;
    const { nombre, ...body } = req.body;


    await Personaje.update(
        { nombre, ...body },
        { where: { id } },

    )
    res.json({
        updated: true
    })


}
module.exports = {
    crearPersonaje,
    actualizarPersonaje
}