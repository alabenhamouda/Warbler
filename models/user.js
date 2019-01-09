const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profileImageUrl: {
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

userSchema.pre('save', function(next){
    const user = this;
    if(user.isModified("password") || user.isNew){
        bcrypt.hash(user.password, 10)
        .then((hash) => {
            user.password = hash;
            next();
        })
    }
    else next();
});

userSchema.methods.checkPassword = async function(pw){
    return bcrypt.compare(pw, this.password);
}

module.exports = mongoose.model('User', userSchema);