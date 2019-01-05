const mongoose = require('mongoose');

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
});

module.exports = mongoose.model('Message', messageSchema);