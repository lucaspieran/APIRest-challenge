
const jwt = require('jsonwebtoken');

const generarJWT = (id = '') => {

    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: '2h'

        }, (err, token) => {

            if (err) {

                console.log(err)
                reject('No se pudo generar le token')
            } else {

                resolve(token);
            }
        })
    })



}




module.exports = {
    generarJWT
}