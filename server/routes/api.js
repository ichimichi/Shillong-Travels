const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/orders', (req, res) => {
    let exp = new RegExp('^' + req.query.dep); // ----> /^2019-01-15/

    Order.find({
        origin: req.query.o.toLowerCase(),
        destination: req.query.d.toLowerCase(),
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
});

router.post('/orders', (req, res) => {
    
});

module.exports = router;
