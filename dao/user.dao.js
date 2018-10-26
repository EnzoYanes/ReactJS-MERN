const User = require('../models/user');
const utils = require('../services/utils');

const register = async(req, res) => {
    const { username, password} = req.body;
    User.findOne({username: username}, (error, usuario) => {
        if (!usuario) {
            const user = new User({username, password});
            user.save();
            res.json({ok: true});
        } else {
            res.json({status: "Existe otro usuario con mismo nombre"});
        }
    })
    
};

const login = (req, res) => {
    const { username, password} = req.body;
    User.findOne({username: username}, (error, usuario) => {
        if(error) throw error;
        if (usuario) {
            if (usuario.comparePassword(password)){
                res.json({
                    ok: true,
                    user: usuario,
                    token: utils.createToken(usuario)
                });
            }else{
                res.json({status: 'Contraseña incorrecta'});
            }
        } else {
            res.json({status: 'Usuario incorrecto'});
        }
    })
};

module.exports = {
    register,
    login
};