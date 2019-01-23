const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname,'../dist/shillong-travels')));

app.use(cors());

app.use(bodyParser.json());

const db = "mongodb://ichimichi:1ch1m1ch1@ds155294.mlab.com:55294/root";

mongoose.connect(db, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.error('Error :' + err);
    } else {
        console.log('MLab: connected');
    }
})

app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/agency', require('./routes/agency'));


app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname,'../dist/shillong-travels/index.html'));
});

app.listen(PORT, () => {
    console.log('Server running on localhost:' + PORT);
})