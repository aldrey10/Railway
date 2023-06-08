
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();

//Database
dbConnection();

//crear servidor de express
const app = express();

app.use(cors());

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());


//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`server running in port ${process.env.PORT}`)
})



