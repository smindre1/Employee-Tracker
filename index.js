const inquirer = require("inquirer");
// const department = require()
const connection = require("./config/connection");

connection.connect((error) => {
  if (error) {
    console.dir("Databse connection error");
  }
  userQuestions();
});

//Inquirer Prompts
const userQuestions = () => {
  inquirer
    .prompt([
      {
        name: "answer",
        message: "What would you like to do?",
        type: "rawlist",
        choices: [
          "View all departments.",
          "View all roles.",
          "View all employees.",
          "Add a department.",
          "Add a role.",
          "Add an employee.",
          "Update an employee role.",
          "Exit.",
        ],
      },
    ])
    .then((obj) => {
      const { answer } = obj;
      if (answer == "View all departments.") {
        viewDepartments();
      }
      if (answer == "View all roles.") {
        viewRoles();
      }
      if (answer == "View all employees.") {
        viewEmployees();
      }
      if (answer == "Add a department.") {
        addDepartment();
      }
      if (answer == "Add a role.") {
        addRole();
      }
      if (answer == "Add an employee.") {
        addEmployee();
      }
      if (answer == "Update an employee role.") {
        updateEmployeeRole();
      }
      if (answer === "Exit.") {
        process.exit();
      }
    });
};
//Grabs the data from the department table in the database and returns a table
const viewDepartments = () => {
  connection.query("SELECT * FROM `department`", function (err, results, fields) {
    console.table(results); // Returns results as a table in terminal
    userQuestions();
  });
};
//Grabs the data from the role table in the database and returns a table
const viewRoles = () => {
  connection.query("SELECT * FROM `role`", function (err, results, fields) {
    console.table(results); // Returns results as a table in terminal
    userQuestions();
  });
};
//Grabs the data from the employee table in the database and returns a table
const viewEmployees = () => {
  connection.query("SELECT * FROM `employee`", function (err, results, fields) {
    console.table(results); // Returns results as a table in terminal
    userQuestions();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please input the name of the new department: ",
        name: "name",
      },
    ])
    .then((obj) => {
      const { name } = obj;
      connection.query("INSERT INTO department (name) VALUES (?)", [name], function (err, results, fields) {
        console.dir("=====================");
        console.dir("New department added.");
        console.dir("=====================");
      });
    });
  userQuestions();
};

const addRole = async () => {
  let roleTitle;
  let salary;
  let array = [];
  await inquirer
    .prompt([
      {
        type: "input",
        message: "Please input the title of the new role: ",
        name: "title",
      },
      {
        type: "input",
        message: "Please input the salary of the role: ",
        name: "money",
      },
    ])
    .then((obj) => {
      const { title, money } = obj;
      roleTitle = title;
      salary = money;
    });
  //
  connection.query("SELECT * FROM `department`", await function (err, results, fields) {
    results.forEach((element) => {
      array.push(element.name);
    });
    inquirer
    .prompt([
      {
        type: "list",
        message: "Please select the department this role belongs to: ",
        choices: array,
        name: "department",
      },
    ])
    .then((obj) => {
      const { department } = obj;
      let id;
      connection.query("SELECT id FROM `department` WHERE name = ?", [department], function (err, results, fields) {
        id = results[0].id;
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [roleTitle, salary, id], function (err, results, fields) {
            console.dir("=====================");
            console.dir(`Added ${roleTitle} to the database.`);
            console.dir("=====================");
            userQuestions();
          });
      });
    });
  });
};

///
//enter the employee’s first name, last name, role, and manager
const addEmployee = () => {
  let firstName;
  let lastName;
  let roleId;
  let managerId;
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please input the employee's first name: ",
        name: "fName",
      },
      {
        type: "input",
        message: "Please input the employee's last name: ",
        name: "lName",
      },
    ])
    .then((obj) => {
      const { fName, lName } = obj;
      firstName = fName;
      lastName = lName;
    });
  viewRoles();
  inquirer
    .prompt([
      {
        type: "number",
        message: "Please input the id associated with the role this employee belongs to: ",
        name: "id",
      },
    ])
    .then((obj) => {
      const { id } = obj;
      roleId = id;
    });
  viewEmployees();
  inquirer
    .prompt([
      {
        type: "number",
        message: "Please input the id associated with the manager that this employee belongs to: ",
        name: "id",
      },
    ])
    .then((obj) => {
      const { id } = obj;
      managerId = id;
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [firstName, lastName, roleId, managerId],
        function (err, results, fields) {
          console.dir(results); // results contains rows returned by server
          viewRoles();
        }
      );
    });
};

//
const updateEmployeeRole = () => {
  let employeeId;
  viewEmployees();
  inquirer
    .prompt([
      {
        type: "number",
        message: "Please choose the id number of the employee you wish to update: ",
        name: "id",
      },
    ])
    .then((obj) => {
      const { id } = obj;
      employeeId = id;
    });
  viewRoles();
  inquirer
    .prompt([
      {
        type: "number",
        message: "Please choose the id number of the role you wish to assign to this employee: ",
        name: "role",
      },
    ])
    .then((obj) => {
      const { role } = obj;
      const roleId = role;
      connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId], function (err, results, fields) {
        console.dir(results); // results contains rows returned by server
        viewEmployees();
      });
    });
};
