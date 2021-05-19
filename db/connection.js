const Sequilize = require('sequelize');

const db = new Sequilize('challenge node', 'root', '', {
    host: process.env.DB_HOST,
    dialect: 'mysql'
}
);

module.exports = db;