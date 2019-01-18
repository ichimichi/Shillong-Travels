const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname,'../dist/shillong-travels')));

app.use(cors());

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname,'../dist/shillong-travels/index.html'));
});

app.listen(PORT, () => {
    console.log('Server running on localhost:' + PORT);
})