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
    console.log('Post an order');
    var newOrder = new Order(req.body);
    newOrder.origin = newOrder.origin.toLowerCase();
    newOrder.destination = newOrder.destination.toLowerCase();
    newOrder.save((err, insertedOrder) => {
        if (err) {
            res.send('Error in Saving the order');
        } else {
            res.json(insertedOrder);
        }
    });
})
router.put('/seat', (req, res) => {
    console.log('Booking');
    let order_id = req.body.id;
    let seat = req.body.seat;

    console.log(seat)
    // var update = new BasicDBObject("available"+"."+seat);
    Order.findOneAndUpdate({ _id: order_id },
        {
            $set: { [`available.${seat}`]: false },

        },
         (err, order) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(order);
                console.log("-----seat no. : ", seat);
                res.status(200).send({booked:true});
            }
        }

    );

})

module.exports = router;
