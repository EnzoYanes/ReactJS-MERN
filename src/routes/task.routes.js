const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Task = require('../models/task');
const User = require('../models/user');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req,res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.post('/', async(req, res) => {
    const {title, description} = req.body;
    const task = new Task({title, description});
    await task.save();
    res.json({status: 'Task Saved'});
});

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
            res.json({status: "Exist this username"});
        }
    })
    
});

router.post('/login', (req, res) => {
    const { username, password} = req.body;
    User.findOne({username: username}, (error, usuario) => {
        if(error) throw error;
        if (usuario) {
            if (bcrypt.compareSync(password, usuario.password)){
                res.json({ok: true});
            }else{
                res.json({status: 'Invalid password'});
            }
        } else {
            res.json({status: 'User not found'});
        }
    })
});

module.exports = router;