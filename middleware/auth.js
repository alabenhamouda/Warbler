const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        let auth = req.header('Authorization');
        if(auth === undefined) throw Error('No Authorization header');
        let token = auth.slice(auth.indexOf(' ') + 1);
        var payLoad = jwt.verify(token, process.env.SECRET_KEY);
    } catch(err) {
        return res.status(401).json({message: err.message});
    }
    if(payLoad.userId != req.params.userId) return res.status(401).json({message: 'You\'re not authorised'});
    next();
}