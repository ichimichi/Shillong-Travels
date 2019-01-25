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
    // console.log('profile acccessed');
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

router.put('/edit', verifyToken, (req, res) => {
    console.log('edit acccessed');
    let token = req.headers.authorization.split(' ')[1];
    id = jwt.decode(token).subject;
    User.findOneAndUpdate({ _id: id }, {
        email: req.body.email, phone: req.body.phone
    }, (err) => {
        if (err) {
            res.status(501).send({ update: false });
        } else {
            res.status(200).send({ update: true });
        }
    });
});

router.put('/password', verifyToken, (req, res) => {
    console.log('password acccessed');

    let token = req.headers.authorization.split(' ')[1];
    id = jwt.decode(token).subject;

    User.findOne({ _id: id },'password', (err, user) => {
        if (err) {
            res.status(501).send(err);
        } else {
            if(req.body.opassword == user.password)
            {
                console.log('password found');
                User.findOneAndUpdate({_id: id},{
                    password: req.body.npassword, cpassword: req.body.npassword
                }, (err)=> {
                     if(err) {
                         res.status(501).send(err);
                     } else {
                         res.status(200).send({match: true});
                     }
                });
            } else {
                res.status(501).send({match: false})
            }
        }
    });


});

router.post('/bookings', (req, res) => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNWM0MWQ2Yzg3NjVlMmY2ODBjYzU0ZmVhIiwiaWF0IjoxNTQ4MzUyMjUxfQ.wZaotwusCG3512O66w5Ff8BGubOW38MhaBLtJBES2BQ";//req.headers.authorization.split(' ')[1];
    id = jwt.decode(token).subject;
    User.findOneAndUpdate({ _id: id }, { $push: { bookings: req.body } }, (err, bookings) => {
        if (err) {
            res.status(501).send(err);
        }
        else {
            // console.log(bookings);
            res.status(200).send(bookings);
        }
    })
});

router.get('/bookings', verifyToken, (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    id = jwt.decode(token).subject;
    User.findOne({ _id: id }, 'bookings', (err, bookings) => {
        if (err) {
            res.status(501).send(err);
        }
        else {
            // console.log(bookings);
            res.status(200).send(bookings);
        }
    })
});

module.exports = router;