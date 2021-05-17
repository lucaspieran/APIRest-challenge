const Usuario = require("../models/Usuario")
const Personaje = require('../models/Personaje');
const { response, request } = require("express");
const bcrypt = require('bcrypt');



//Generar Usuario
const crearUsuario = async (req = request, res = response) => {
    const { email, password } = req.body
    const usuario = new Usuario({ email, password });

    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({ where: { email } });
    if (existeEmail) {
        return res.status(400).json({
            msg: "ya existe un usuario con ese email"
        })
    }

    //hash password

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    
    //guardar en db
    await usuario.save();
    res.json(usuario)


}



const asd = async (req, res) => {
    const personaje = await Personaje.findAll();

    res.json({
        "ok": "asd",
        personaje
    })
}








module.exports = {
    crearUsuario

}