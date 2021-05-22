const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const payload =jwt.verify(token, process.env.SECRETKEY);
        console.log(payload)
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: "Token no válido"
        })
    }





}
module.exports = {
    validarJWT
}