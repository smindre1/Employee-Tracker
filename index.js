const inquirer = require("inquirer");
const connection = require("./config/connection");

//This checks if the program has properly connected to the database
connection.connect((error) => {
  if (error) {
    console.dir("Databse connection error");
  }
  userQuestions();
});

//This function prompts the user to ask what they want to do
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
    dataTable(results); // Returns results as a table in terminal
    userQuestions();
  });
};
//Grabs the data from the role table in the database and returns a table
const viewRoles = () => {
  connection.query("SELECT * FROM `role`", function (err, results, fields) {
    dataTable(results); // Returns results as a table in terminal
    userQuestions();
  });
};
//Grabs all the employee data from the database and returns a table
const viewEmployees = () => {
  connection.query(
    "SELECT e.id, e.first_name, e.last_name, r.title, d.department, r.salary, CONCAT_WS(' ', b.first_name, b.last_name) AS manager FROM employee e JOIN role r on  e.role_id = r.id LEFT JOIN department d on r.department_id = d.id LEFT JOIN employee b on e.manager_id = b.id",
    function (err, results, fields) {
      dataTable(results); // Returns results as a table in terminal
      userQuestions();
    }
  );
};

//This function allows you to add a department to the database
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
      connection.query("INSERT INTO department (department) VALUES (?)", [name], function (err, results, fields) {
        console.dir("=====================");
        console.dir("New department added.");
        console.dir("=====================");
        userQuestions();
      });
    });
};

//This function allows you to add a role to a department///////////
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
  connection.query(
    "SELECT * FROM `department`",
    await function (err, results, fields) {
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
          connection.query("SELECT id FROM `department` WHERE department = ?", [department], function (err, results, fields) {
            id = results[0].id;
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [roleTitle, salary, id], function (err, results, fields) {
              console.dir("=====================");
              console.dir(`Added ${roleTitle} to the database.`);
              console.dir("=====================");
              userQuestions();
            });
          });
        });
    }
  );
};

//This function allows you to add a new employee by entering the employee’s first name, last name, role, and manager
const addEmployee = () => {
  let firstName;
  let lastName;
  let roleId;
  let managerId;
  let array = [];

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
      connection.query("SELECT title FROM `role`", function (err, results, fields) {
        results.forEach((element) => {
          array.push(element.title);
        });
        inquirer
          .prompt([
            {
              type: "list",
              message: "Please select the role this employee belongs to: ",
              choices: array,
              name: "role",
            },
          ])
          .then((obj) => {
            const { role } = obj;
            connection.query("SELECT id FROM `role` WHERE title = ?", [role], function (err, results, fields) {
              roleId = results[0].id;
              connection.query("SELECT first_name, last_name FROM `employee`", function (err, results, fields) {
                array = ["None"];
                results.forEach((element) => {
                  array.push(`${element.first_name} ${element.last_name}`);
                });
                inquirer
                  .prompt([
                    {
                      type: "list",
                      message: "Please state which manager this employee belongs to: ",
                      choices: array,
                      name: "manager",
                    },
                  ])
                  .then((obj) => {
                    const { manager } = obj;
                    let managerId;
                    if (manager === "None") {
                      managerId = null;
                    } else {
                      const fullName = manager.split(" ");
                      connection.query(
                        "SELECT id FROM `employee` WHERE first_name = ? AND last_name = ?",
                        [fullName[0], fullName[1]],
                        function (err, results, fields) {
                          managerId = results[0].id;
                          connection.query(
                            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                            [firstName, lastName, roleId, managerId],
                            function (err, results, fields) {
                              userQuestions();
                            }
                          );
                        }
                      );
                    }
                  });
              });
            });
          });
      });
    });
};

//This allows you to select an employee from the database and update their role
const updateEmployeeRole = () => {
  let array = [];
  connection.query("SELECT first_name, last_name FROM `employee`", function (err, results, fields) {
    results.forEach((element) => {
      array.push(`${element.first_name} ${element.last_name}`);
    });
    inquirer
      .prompt([
        {
          type: "list",
          message: "Please choose which employee to update: ",
          choices: array,
          name: "employee",
        },
      ])
      .then((obj) => {
        const { employee } = obj;
        let employeeId;
        const fullName = employee.split(" ");
        connection.query("SELECT title FROM `role` ", function (err, results, fields) {
          array = [];
          results.forEach((element) => {
            array.push(`${element.title}`);
          });
          inquirer
            .prompt([
              {
                type: "list",
                message: "Please choose which role to assign to the employee: ",
                choices: array,
                name: "role",
              },
            ])
            .then((obj) => {
              const { role } = obj;
              connection.query("SELECT id FROM `role` WHERE title = ? ", [role], function (err, results, fields) {
                connection.query(
                  "UPDATE `employee` SET role_id = ? WHERE first_name = ? AND last_name = ? ",
                  [results[0].id, fullName[0], fullName[1]],
                  function (err, results, fields) {
                    userQuestions();
                  }
                );
              });
            });
        });
      });
  });
};

//This function takes in an array objects that possess the same keys and transforms it into a table
const dataTable = (data) => {
  // Measures the length of the widest item for a specific object key
  const columnWidth = (key, nestedArray) => {
    let width = key.length;
    nestedArray.forEach((element) => {
      //Checks if an item is null or empty and readjusts it to be read properly
      if (element[key] == null || element[key] == "") {
        element[key] = "null";
      }
      //Keeps track of what the widest item is
      if (width < element[key].length) {
        width = element[key].length;
      }
    });
    return width;
  };
  //It's saying as long as their is data received, run it, otherwise, don't
  if (data[0] != null && data[0] != undefined) {
    const keys = Object.keys(data[0]);
    const numOfKeys = keys.length;
    const widthArray = [];
    //width of each key column
    keys.forEach((element) => {
      widthArray.push(columnWidth(element, data));
    });
    //This creates the top border line of the table
    for (i = 0; i < numOfKeys; i++) {
      let borderWidth = 0;
      borderWidth = borderWidth + columnWidth(keys[i], data) + 2;
    }
    let topBorderLine = "┌";
    let sideLine = "─";
    for (i = 0; i < widthArray.length; i++) {
      topBorderLine = topBorderLine + sideLine.repeat(widthArray[i] + 2);
      topBorderLine = topBorderLine + "┬";
    }
    topBorderLine = topBorderLine.slice(0, -1) + "┐";
    console.dir(topBorderLine);
    //This creates the row of column titles
    let row = "│";
    let space = " ";
    for (i = 0; i < numOfKeys; i++) {
      let padding = widthArray[i] + 2 - keys[i].length;
      if (padding % 2 == 1) {
        padding = (padding - 1) / 2;
        row = row + space.repeat(padding) + keys[i] + space.repeat(padding + 1) + "│";
      } else {
        row = row + space.repeat(padding / 2) + keys[i] + space.repeat(padding / 2) + "│";
      }
    }
    console.dir(row);
    //This creates the division line that separates the column titles and the column data
    let divider = "├";
    for (i = 0; i < widthArray.length; i++) {
      divider = divider + sideLine.repeat(widthArray[i] + 2);
      divider = divider + "┼";
    }
    divider = divider.slice(0, -1) + "┤";
    console.dir(divider);
    //This creates each row of the table
    row = "│";
    data.forEach((element) => {
      for (i = 0; i < numOfKeys; i++) {
        //Adds each key value with padding around it
        let padding;
        if (element[keys[i]] == null) {
          padding = widthArray[i] + 2 - 4; //The 4 is in place of the character length for null
          element[keys[i]] = "null";
        } else {
          padding = widthArray[i] + 2 - element[keys[i]].toString().length;
        }
        if (padding % 2 == 1) {
          padding = (padding - 1) / 2;
          row = row + space.repeat(padding) + element[keys[i]] + space.repeat(padding + 1) + "│";
        } else {
          row = row + space.repeat(padding / 2) + element[keys[i]] + space.repeat(padding / 2) + "│";
        }
      }
      console.dir(row);
      row = "│";
    });
    //This creates the bottom borderline of the table
    divider = "└";
    for (i = 0; i < widthArray.length; i++) {
      divider = divider + sideLine.repeat(widthArray[i] + 2);
      divider = divider + "┴";
    }
    divider = divider.slice(0, -1) + "┘";
    console.dir(divider);
  }
};
