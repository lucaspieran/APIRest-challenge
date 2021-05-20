const { Router } = require('express');
const { crearPersonaje, actualizarPersonaje, eliminarPersonaje } = require('../controllers/personajes');

const router = Router();

// obtener listado de personajes
router.get('/', ); 

//crear personaje
router.post('/', crearPersonaje);

//actualizar personaje
router.put('/:id', actualizarPersonaje)

//eliminarpersonaje
router.delete('/:id', eliminarPersonaje)

module.exports= router;