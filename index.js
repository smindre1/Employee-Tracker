const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: 'localhost',
        //MySQL Username
        user: 'root',
        //MySQL password
        password: 'password',
        database: 'employee_db'
    },
    console.log("Connected to the employee_db database")
);

//This initiates a query to workbench, after the query is finished it launches a follow up function for what to do with the responding data.
db.query('SELECT * FROM employee_assignment', function(err, results) {
    console.log(results);
})