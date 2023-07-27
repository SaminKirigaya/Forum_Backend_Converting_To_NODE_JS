require('dotenv').config();
const mysql = require('mysql2/promise');
// MySQL database connection
const dbConnection = mysql.createPool({
    host: process.env.Host,
    user: process.env.User,
    password: process.env.Pass,
    database: process.env.DB,
  });
  

module.exports = dbConnection;  