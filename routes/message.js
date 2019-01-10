const router = require('express').Router({mergeParams: true});
const {Message, User} = require('../models');

router.post('/', (req, res) => {
    const userId = req.params.userId;
    User.findById(userId)
    .then(async (user) => {
        let msg = {
            text: req.body.text,
            userId
        }
        let message = await Message.create(msg);
        user.messages.push(message._id);
        let update = await user.save();
        update = await update.populate('messages').execPopulate();
        res.json(update);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});

module.exports = router;