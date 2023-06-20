/*imports necessary modules and sets up a server using the Express framework. */
const express = require('express');
const mongoose = require('mongoose');
const dotenv =      require('dotenv');
dotenv.config();
const DB = require('./configration/DataBase');
const port = 4500;
const app = express();
const bodyParser =  require('body-parser');
const jwt =         require('jsonwebtoken')
const path = require('path');

app.use(express.static(path.join(__dirname, 'views')));
// for json and encoding
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async(req ,res) => {
    return res.sendFile(path.join(__dirname,'views', 'home.html'));
});
app.use('/',require('./routers')); //Using Express Router For routing all access


// connecting DB then start sever
DB.ConnectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server Connected Success ${port}`);
    });
});