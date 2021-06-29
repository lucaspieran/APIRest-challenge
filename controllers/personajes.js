const { response, request } = require('express');
const Personaje = require('../models/Personaje');
const fs = require('fs');
const multer = require('multer');
const shortid = require('shortid');





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

//config multer
const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');


// Sube un archivo 
const subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next();
    })
}

const crearPersonaje = async (req = request, res = response) => {

    const { nombre, ...body } = req.body;

    const nombreDB = await Personaje.findOne({ where: { nombre } })

    const personaje = new Personaje(req.body);

    if (nombreDB) {
        return res.status(400).json({
            msg: `El nombre ${nombre} ya se encuentra registrado`
        })
    }

    if (req.file) {
        personaje.imagen = req.file.filename
    } else {
        return res.status(400).json({
            msg: "Debes elegir una imagen"
        })
    }

    //guardar en db
    await personaje.save();
    res.status(200).json(personaje)



}

//actualizar personaje

const actualizarPersonaje = async (req = request, res = response) => {
    const { id } = req.params;
    const nuevoPersonaje = req.body

    try {
        const personaje = await Personaje.findByPk(id)
        if (!personaje) {
            return res.status(404).json({
                msg: "No existe personaje con ese Id " + id
            })
        }

        //verificar si hay nueva imagenas
        if (req.file) {
            nuevoPersonaje.imagen = req.file.filename
        } else {
            nuevoPersonaje.imagen = personaje.imagen
        }

        await personaje.update(nuevoPersonaje);


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
    subirArchivo,
    crearPersonaje,
    actualizarPersonaje,
    eliminarPersonaje,
    obtenerPesonajes,
    detallePersonaje
}