const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerPeliculas, crearPelicula, actualizarPelicula, eliminarPelicula } = require('../controllers/peliculas');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


//obtener peliculas
router.get('/',validarJWT, obtenerPeliculas);

//crear peliculas
router.post('/', [validarJWT,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatorio').not().isEmpty(),
    check('calificacion', 'La calificacion es obligatorio').not().isEmpty(),
    validarCampos
], crearPelicula)

//actualizarpeliculas
router.put('/:id',validarJWT, actualizarPelicula)

router.delete('/:id',validarJWT, eliminarPelicula)


module.exports = router;