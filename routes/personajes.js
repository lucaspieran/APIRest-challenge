const { Router } = require('express');
const { crearPersonaje, actualizarPersonaje } = require('../controllers/personajes');

const router = Router();


// router.get('/characters', ); // obtener listado de personajes

router.post('/crearpj', crearPersonaje);

router.put('/actualizarpj/:id', actualizarPersonaje)


module.exports= router;