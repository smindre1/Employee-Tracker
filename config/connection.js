const mysql = require("mysql2");
require('dotenv').config();

//Establishes a connection to the mySQL database
const connection = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD

  }
);

module.exports = connection;