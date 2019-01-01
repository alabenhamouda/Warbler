const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('hello Wolrd!');
})

app.listen(3000, () => console.log('App is running'));