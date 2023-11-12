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

INSERT INTO department (name)
VALUES ('Advertisement'), ('Computer Repair');

INSERT INTO roles (title, salary, department_id)
VALUES ('Computer Repair', 80000, 2), ('Advertisement', 70000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Douglas", 1, null), ("Jamey", "Oak", 1, null),
("Chuck", "Ronald", 1, null), ("Ash", "Ketchum", 2, 2);