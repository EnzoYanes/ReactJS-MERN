const jwt = require('jwt-simple');
const moment = require('moment');

function isAuth(req, res, next) {
    if (!req.headers.authorization){
        return res.status(403).json({message: 'No tienes autorización'})
    }

    const token = req.headers.authorization.split(" ")[1];
    decodeToken(token)
        .then(response => {
            req.usuario = response
            next()
        })
        .catch(response => {
            return res.status(response.status).json({message: response.message})
        });
}

function createToken(usuario) {
    const payload = {
        usuario: usuario,
        iat: moment().unix(),
        exp: moment().add(3, 'minutes').unix()
    }

    return jwt.encode(payload, 'secret')
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, 'secret')
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'Token expirado'
                })
            }

            resolve(payload.usuario)
        } catch (err) {
            reject({
                status: 500,
                message: 'Token inválido'
            })
        }
    })
    return decoded;
}

module.exports = {
    isAuth,
    createToken,
    decodeToken
};