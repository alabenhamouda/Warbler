const router = require('express').Router({mergeParams: true});
const {Message, User} = require('../models');
const authorization = require('../middleware/auth');

router.route('/')
    .get(async function(req, res){
        try{
            let user = await User.findById(req.params.userId)
                                 .populate("messages", 'text');
            res.status(200).json(user.messages);
        } catch(err){
            res.status(400).json(err.message);
        }
    })
    .post(authorization, (req, res) => {
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
            update = await update.populate('messages', 'text').execPopulate();
            res.json(update);
        })
        .catch(err => {
            res.status(400).json(err);
        })
    });

router.route('/:messageId')
      .get(async function(req, res){
          try{
              let message = await Message.findById(req.params.messageId);
              res.status(200).json(message);
          } catch(err){
            res.status(400).json(err.message);
          }
      })
      .delete(authorization, async function(req, res){
          try{
            let msg = await Message.findById(req.params.messageId);
            let removed = await msg.remove();
            res.status(200).json(removed);
          } catch(err){
              res.status(400).json(err.message);
          }
      })

module.exports = router;