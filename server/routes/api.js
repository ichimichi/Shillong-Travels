const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Order = require('../models/order');

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

router.post('/register',(req,res)=>{
    let userData = req.body;
    let user = new User(userData);
    user.save((err,registeredUser)=>{
        if(err){
            console.log(err);
        } else {
            res.status(200).send(registeredUser);
        }
    })
})

router.get('/orders', (req,res)=>{
    let exp = new RegExp('^'+req.query.dep); // ----> /^2019-01-15/
    Order.find({
        origin:req.query.o,
        destination:req.query.d,
        departure:{$regex:exp},
        available: {$exists:true},
        $where: 'this.available.filter(value=> value).length>='+req.query.n 
    },(err,orders)=>{
        if(err){
            console.log(err);
        }else{
            res.send(orders);
        }
    })
})

module.exports = router;
