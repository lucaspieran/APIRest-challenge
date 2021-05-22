const { Router } = require('express');
const { check } = require('express-validator');
const { crearPersonaje, actualizarPersonaje, eliminarPersonaje, obtenerPesonajes, detallePersonaje } = require('../controllers/personajes');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const upload = require('../middlewares/upload');

const router = Router();

// obtener listado de personajes
router.get('/', [
    validarJWT
], obtenerPesonajes);

//detallesdepersonaje
router.get('/:id',validarJWT, detallePersonaje)

//crear personaje
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('edad', 'La edad es obligatorio').not().isEmpty(),
    check('peso', 'El peso es obligatorio').not().isEmpty(),
    check('historia', 'La historia es obligatorio').not().isEmpty(),
    validarCampos,
    // upload.single("file")
], crearPersonaje);

//actualizar personaje
router.put('/:id', validarJWT, actualizarPersonaje)

//eliminarpersonaje
router.delete('/:id', validarJWT, eliminarPersonaje)

module.exports = router;