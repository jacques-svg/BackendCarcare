require('dotenv').config();
const mysql2 = require('mysql2')

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'soromoudalton',
    database: 'carcare'
})

db.connect();
module.exports = db;