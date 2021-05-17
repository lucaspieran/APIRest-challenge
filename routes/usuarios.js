const { Router } = require('express');
const { crearUsuario, asd } = require('../controllers/auth');


const router = Router();



router.post('/register', crearUsuario);

// router.post('/', asd);



module.exports =router