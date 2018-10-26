const express = require('express');
const router = express.Router();
const user = require('../dao/user.dao');
const utils = require('../services/utils');

router.post('/register', user.register);

router.post('/login', user.login);

router.get('/private', utils.isAuth , function(req, res){
    res.status(200).json({message: 'Tienes acceso'})
});

module.exports = router;