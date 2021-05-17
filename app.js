const express = require('express');


const app = express();

// Lectura y parseo del body
app.use( express.json() )


app.use('/api/auth', require('./routes/usuarios'));

require('./db/connection');






app.listen(3000, () => {
    console.log(`servidor corriendo en ${3000}`)
})