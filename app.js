const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').load();
const auth = require('./routes/auth');
const messagesRouter = require('./routes/message');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/warbler');
mongoose.connection.on('error', () => console.error('connection error!'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/auth/', auth);
app.use('/users/:userId/messages', messagesRouter);
app.get('/', (req, res) => {
    res.json({
        message: "Make a request to /api/auth"
    });
})

app.listen(process.env.PORT || 8080, () => console.log('App is running'));