--Seeds the dabase with some initial data
INSERT INTO department (department)
VALUES ('Advertisement'), ('Computer Repair');

INSERT INTO role (title, salary, department_id)
VALUES ('Computer Repair', 80000, 2), ('Advertisement', 70000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Douglas", 1, null), ("Jamey", "Oak", 1, null),
("Chuck", "Ronald", 1, null), ("Ash", "Ketchum", 2, 2);