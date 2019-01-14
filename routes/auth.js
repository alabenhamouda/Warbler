var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var {User} = require('../models');

router.use(function(req, res, next){
    res.set('Access-Control-Allow-Origin', "http://localhost:3000");
    res.set('Access-Control-Allow-Methods', "POST");
    res.set('Access-Control-Allow-Headers', "Content-Type");
    res.set('Access-Control-Allow-Credentials', "true");
    next();
});
router.post('/signup', (req, res) => {
    // res.cookie('aze', 'testtest', {httpOnly: false});
    User.create(req.body)
    .then(user => {
        let token = jwt.sign({userId: user.id}, process.env.SECRET_KEY);
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
router.post('/signin', (req, res) => {
    const {email, password} = req.body;
    User.findOne({email})
    .then(user => {
        user.checkPassword(password)
        .then(match => {
            if (match){
                let token = jwt.sign({userId: user.id}, process.env.SECRET_KEY);
                res.json({
                    userId: user.id,
                    token,
                    username: user.uesrname
                })
            } else {
                res.status(400).json({message: "invalid email/password combination"});
            }
        })
    })
    .catch(err => {
        res.status(400).json({message: "invalid email/password combination"});
    })
});

module.exports = router;