const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//registro
router.post('/register', [
    check('email', 'El email no es valido').isEmail(),
    check('password', 'El contraseña debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    validarCampos,
], crearUsuario);


//login
router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio y mayor a 6 caracteres').not().isEmpty().isLength({ min: 6 }),
    validarCampos
], login);



module.exports = router