USE employee_db;

CREATE TABLE employee_assignment (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    roles VARCHAR(30) NOT NULL,
    date_added DATETIME NOT NULL
);


SELECT * FROM names;