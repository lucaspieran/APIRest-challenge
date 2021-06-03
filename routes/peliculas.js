const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerPeliculas, crearPelicula, actualizarPelicula, eliminarPelicula } = require('../controllers/peliculas');
const { subirArchivo } = require('../controllers/personajes');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


//obtener peliculas
router.get('/', validarJWT, obtenerPeliculas);

//crear peliculas
router.post('/', [validarJWT, subirArchivo], crearPelicula)

//actualizarpeliculas
router.put('/:id', [validarJWT, subirArchivo], actualizarPelicula)

router.delete('/:id', validarJWT, eliminarPelicula)


module.exports = router;