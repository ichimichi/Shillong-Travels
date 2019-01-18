const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Order = require('../models/order');
const jwt = require('jsonwebtoken');

const db = "mongodb://ichimichi:1ch1m1ch1@ds155294.mlab.com:55294/root";

mongoose.connect(db, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.error('Error :' + err);
    } else {
        console.log('MLab: connected');
    }
})

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
router.get('/', (req, res) => {
    res.send('From api route');
});

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

router.get('/orders', (req, res) => {
    let exp = new RegExp('^' + req.query.dep); // ----> /^2019-01-15/
    Order.find({
        origin: req.query.o,
        destination: req.query.d,
        departure: { $regex: exp },
        available: { $exists: true },
        $where: 'this.available.filter(value=> value).length>=' + req.query.n
    }, (err, orders) => {
        if (err) {
            console.log(err);
        } else {
            res.send(orders);
        }
    })
})

module.exports = router;
