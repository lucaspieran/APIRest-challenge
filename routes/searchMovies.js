const { Router } = require('express');
const { buscarPelicula } = require('../controllers/buscarPelicula');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/',validarJWT, buscarPelicula);


module.exports = router