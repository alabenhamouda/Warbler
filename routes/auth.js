var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var {User} = require('../models');

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
        res.send(err.errmsg);
    })
});

module.exports = router;