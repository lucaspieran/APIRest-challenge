const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const multer = require('multer');

const upload = multer({ dest: 'public/images' })

const app = express();
global.__basedir = __dirname;

// Lectura y parseo del body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json());


//routes
app.use('/api/auth', require('./routes/usuarios'));
app.use('/api/characters', require('./routes/personajes'));
app.use('/api/movies', require('./routes/peliculas'));
app.use('/api/search/characters', require('./routes/search'));
app.use('/api/search/movies', require('./routes/searchMovies'));

require('./db/connection');


app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en ${process.env.PORT}`)
})