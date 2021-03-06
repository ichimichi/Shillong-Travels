const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Order = require('../models/order');

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

    User.findOne({ _id: id }, 'password', (err, user) => {
        if (err) {
            res.status(501).send(err);
        } else {
            if (req.body.opassword == user.password) {
                console.log('password found');
                User.findOneAndUpdate({ _id: id }, {
                    password: req.body.npassword, cpassword: req.body.npassword
                }, (err) => {
                    if (err) {
                        res.status(501).send(err);
                    } else {
                        res.status(200).send({ match: true });
                    }
                });
            } else {
                res.status(501).send({ match: false })
            }
        }
    });

});

router.put('/cancel',verifyToken, (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    id = jwt.decode(token).subject;
    User.findOneAndUpdate(
        { 
            _id: id
        },{
            $set: { [`bookings.${req.body.index}.status`]: 'cancelled' },
        },
        (err, user) => {
            if (err) {
                res.status(501).send({cancel:false});
            }
            else {
                // console.log(user);
                res.status(200).send({cancel:true});
            }
        })
})

router.post('/bookings', verifyToken, (req, res) => {
    console.log("booking", req.body.selection)
    let token = req.headers.authorization.split(' ')[1];
    id = jwt.decode(token).subject;

    if (req.body.selection.length > 0) {
        User.findOneAndUpdate({ _id: id }, { $push: { bookings: req.body } }, (err, user) => {
            if (err) {
                res.status(501).send(err);
            }
            else {
                // console.log(user.bookings.slice(-1).pop());

                User.findOne({ _id: id }, (err, user) => {
                    if (err) {
                        res.status(501).send(err);
                    } else {
                        // console.log(user.bookings.slice(-1).pop());
                        res.status(200).send(user.bookings.slice(-1).pop());
                    }
                })
            }
        })
    } else {
        res.status(501).send("Invalid Request");
    }
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