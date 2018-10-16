const jwt = require('jsonwebtoken');
const User = require('../models/user');

function generateToken(user) {
    var u = {
        _id: user._id,
        username: user.username
    };
    return token = jwt.sign(u, 'secret', { expiresIn: 60*2 });
}

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
                    token: generateToken(usuario)
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