const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const task = require('../dao/task.dao')
//const Task = require('../models/task');
const User = require('../models/user');

function generateToken(user) {
    var u = {
        _id: user._id,
        username: user.username
    };
    return token = jwt.sign(u, 'secret', { expiresIn: 60*2 });
}

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req,res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.post('/', task.insert);

router.put('/:id', async(req, res) => {
    const { title, description } = req.body;
    const newTask = {title,description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task Updated'});
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Task Deleted'});
});

router.post('/register', async(req, res) => {
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
    
});

router.post('/login', (req, res) => {
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
});

module.exports = router;