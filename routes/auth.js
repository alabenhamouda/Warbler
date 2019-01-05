var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var {User} = require('../models');

router.use(function(req, res, next){
    res.set('Access-Control-Allow-Origin', "http://localhost:8080");
    res.set('Access-Control-Allow-Methods', "POST");
    res.set('Access-Control-Allow-Headers', "Content-Type");
    next();
});
router.post('/signin', (req, res) => {
    User.create(req.body)
    .then(user => {
        let token = jwt.sign({userId: user.id}, 'a_very_hard_to_guess_secret');
        res.json({
            userId: user.id,
            token,
            username: user.username
        })
    })
    .catch(err => {
        res.json(err);
    })
});

module.exports = router;