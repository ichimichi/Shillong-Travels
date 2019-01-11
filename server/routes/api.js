const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const db = "mongodb://ichimichi:1ch1m1ch1@ds155294.mlab.com:55294/root";

mongoose.connect(db, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.error('Error :' + err);
    } else {
        console.log('MLab: connected');
    }
})
router.get('/', (req, res) => {
    res.send('From api route');
});

module.exports = router;
