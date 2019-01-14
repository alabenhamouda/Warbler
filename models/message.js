const mongoose = require('mongoose');
const User = require('./user');

var messageSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true,
        maxlength: 160
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }   
}, {timestamps: true});

messageSchema.pre('remove', async function(next){
    let user = await User.findById(this.userId);
    user.messages.remove(this.id);
    await user.save();
    next();
})

module.exports = mongoose.model('Message', messageSchema);