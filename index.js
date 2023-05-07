const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

//conectar mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_MONGO ,{
    useNewUrlParser: true,
});
console.log('DB conectado');

//crear servidor
const app = express();

//carpeta publica
app.use(express.static('uploads'));

//habiliatr bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//definir un dominio(s)
const whiteList = [process.env.FRONTEND_URL || process.env.FRONTEND_URL_APP];
const corsOptions = {
    origin: (origin, callback) => {
        //revisar que las peticiones vengan de un servidor que esta en whiteList
        const existe = whiteList.some(dominio =>  dominio === origin);
        if( existe ) {
            callback(null, true);
        }else {
            callback(new Error('No permitido por Cors'));
        }
    }
}

//habilitando cors
app.use(cors(corsOptions));

//rutas app
app.use('/', routes())

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000

//crear puerto
app.listen( port, host, () => {
    console.log('Servidor corriendo en puerto ' + port );
});

