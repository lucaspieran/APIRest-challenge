const Usuario = require("../models/Usuario")
const { response, request } = require("express");
const bcrypt = require('bcrypt');
const { generarJWT } = require("../helpers/generar-JWT");




//Generar Usuario
const crearUsuario = async (req = request, res = response) => {

    const { email, password } = req.body
    const usuario = new Usuario({ email, password });

    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({ where: { email } });
    if (existeEmail) {
        return res.status(400).json({
            msg: "Ya existe un usuario con ese email"
        })
    }

    //hash password

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //guardar en db
    await usuario.save();
    res.status(200).json(usuario)


}


//login

const login = async (req, res) => {

    const { email, password } = req.body;


    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Email / Password no son correctos'
            })
        }

        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Email / Password no son correctos'
            })
        }

        //generar el jwt
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: "login ok",
            token,
            usuario
        })



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }

}








module.exports = {
    crearUsuario,
    login

}