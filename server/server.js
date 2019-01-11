const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.listen(PORT,()=>{
    console.log('Server running on localhost:'+ PORT);
})