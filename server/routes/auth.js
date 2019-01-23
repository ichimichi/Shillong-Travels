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

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err);
        } else {
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, '14ri80k');
            res.status(200).send({ token });
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                res.status(401).send('Invalid e-mail');
            }
            else if (user.password !== userData.password) {
                res.status(401).send('Invalid password');
            }
            else {
                let payload = { subject: user._id };
                let token = jwt.sign(payload, '14ri80k');
                res.status(200).send({ name: user.firstName, token });
            }


        }
    })
});

module.exports = router;
