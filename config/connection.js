const mysql = require("mysql2");

const connection = mysql.createConnection(
  {
    host: "localhost",
    //MySQL Username
    user: "root",
    database: "employee_db",
  }
);

module.exports = connection;