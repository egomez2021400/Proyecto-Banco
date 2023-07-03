'use strict'

const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cors = require("cors")
const { connection } = require("./src/database/connection");
const { ADMINB } = require("./src/controllers/user.controller");
const user = require('./src/routes/user.routes');
const favorito = require('./src/routes/favorite.routes');
const tranferencia = require('./src/routes/tranferencia.routes');

ADMINB();
connection();

app.use(express.urlencoded({extended: false}));

app.use(express.json());
app.use(cors());
app.use('/api', user,
                favorito,
                tranferencia)

app.listen(port, () => {
    console.log(`The server is connected to the port ${port}`)
})