const { Router } = require('express');
const { check } = require('express-validator');
const { crearPersonaje, actualizarPersonaje, eliminarPersonaje, obtenerPesonajes, detallePersonaje, subirArchivo } = require('../controllers/personajes');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const upload = require('../middlewares/upload');

const router = Router();

// obtener listado de personajes
router.get('/', [
    validarJWT
], obtenerPesonajes);

//detallesdepersonaje
router.get('/:id', validarJWT, detallePersonaje)

//crear personaje
router.post('/', [validarJWT, subirArchivo], crearPersonaje);

//actualizar personaje
router.put('/:id', [validarJWT, subirArchivo], actualizarPersonaje)

//eliminarpersonaje
router.delete('/:id', validarJWT, eliminarPersonaje)

module.exports = router;