require('dotenv').load();
const faker = require('faker');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {User: userModel, Message: messageModel} = require('./models');
mongoose.connect(process.env.DBURL);

class Message{
    constructor(){
        this.text = faker.lorem.text().slice(0, 160);
    }
    async save(userId){
        this.userId = userId;
        var msg = await messageModel.create(this)
        this.id = msg._id;
    }
}

class User {
    constructor(){
        this.email = faker.internet.email();
        this.username = faker.internet.userName();
        this.password = 'password';
        this.profileImageUrl = faker.image.avatar();
    }
    async save(){
        var user = await userModel.create(this)
        this.id = user._id;
        return user;
    }
    async makeMessages(msgs, userDoc){
        for(let msg of msgs){
            await msg.save(this.id);
            userDoc.messages.push(msg.id);
        }
        await userDoc.save()
    }
}


async function loadOneUser(){
    let user = new User();
    var doc = await user.save();
    let n = Math.floor(Math.random() * 8 + 3);
    let msgs = [];
    for(let j = 0; j < n; j++){
        msgs.push(new Message());
    }
    await user.makeMessages(msgs, doc);
}

async function loadData(n = 0){
    if(n < process.env.USERS_NUM){
        await loadOneUser();
        console.log((n + 1) + ". User loaded.");
        await loadData(n + 1);
    }
}

loadData().then(() => console.log("Done!"))
.then(() => mongoose.disconnect())
.catch(err => console.log(err));