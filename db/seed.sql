DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id  INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary decimal,
    department_id INT,
    FOREIGN KEY(department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY(role_id)
    REFERENCES role(id),
    manager_id INT,
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)
);



-- /////////////////
-- SELECT * FROM department;


-- INSERT INTO users (username, email, password)
-- VALUES ("user", "user@gmail.com", "password");

-- INSERT INTO lists (title, theme, user_id)
-- VALUES ("List Title", Null, 1), ("Empty", Null, 1);

-- INSERT INTO list_items (recipient, price, present, date, list_id)
-- VALUES ("Bob", "3:00$", "Present 1", Null, 1 ),
-- ("Jerry", "6:00$", "Present 2", Null, 1 ),
-- ("Tom", "9:00$", "Present 3", Null, 1 ),
-- ("Chuck", "12:00$", "Present 4", Null, 1 );