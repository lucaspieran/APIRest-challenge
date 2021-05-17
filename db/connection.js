const Sequilize = require('sequelize');

const db = new Sequilize('challenge node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
}, {
    timestamps: false
}
);

module.exports = db;