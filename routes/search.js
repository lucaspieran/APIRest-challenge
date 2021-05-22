const { Router } = require('express');
const { buscarPersonajes } = require('../controllers/buscarPersonajes');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT, buscarPersonajes);


module.exports = router