const express = require('express');
require('dotenv').config();

const app = express();

// Lectura y parseo del body
app.use(express.json())


//routes
app.use('/api/auth', require('./routes/usuarios'));
app.use('/api/characters', require('./routes/personajes'));

require('./db/connection');




app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en ${process.env.PORT}`)
})