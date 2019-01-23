const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request');
    }

    let token = req.headers.authorization.split(' ')[1];

    if (token === null) {
        return res.status(401).send('Unauthorized Request');
    }

    let payload = jwt.verify(token, '14ri80k');

    if (!payload) {
        return res.status(401).send('Unauthorized Request');
    }

    req.userId = payload.subject;
    next()
}

router.get('/profile', verifyToken, (req, res) => {
    console.log('profile acccessed');
    let token = req.headers.authorization.split(' ')[1];
    id = jwt.decode(token).subject;
    // console.log('id:', id);
    User.findOne({ _id: id }, 'firstName lastName email dateOfBirth gender phone', (err, user) => {
        if (err) {
            res.status(501).send(err);
        } else {
            res.status(200).send(user);
        }
    });

});

router.put('/edit', (req, res) => {

});

router.post('/boookings', (req, res) => {

});

router.get('/boookings', (req, res) => {

});

module.exports = router;