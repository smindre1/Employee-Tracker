# Employee Tracker

By `Shane Mindreau`

## Description

This is a command line **content managment system (CMS)** directed towards the purpose of a company using a database to keep track of employees, their roles, and their departments. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Badges](#badges)
- [Features](#features)
- [Tests](#tests)

## Installation

- The first step is to set up your database on a MySQL database system. For our program we used `MySQL Workbench 8.0 CE`. To set up your database, run the code found in the **schema.sql** file once in your MySQL database system. If you would like to add some filler data to your database then you can also run the code in **seed.sql** once as well.
- After that, while in your directory that holds the app index.js, run an `npm install` in your terminal to download the npm packages necessary to run the app.
- To run the app, stay in your directory that holds the app index.js, and run `node index.js` in your terminal.

## Usage

- Once the app is running, the user will be prompted with eight choices: 
    - 'View all departments',
    - 'View all roles',
    - 'View all employees',
    - 'Add a department',
    - 'Add a role',
    - 'Add an employee',
    - 'Update an employee role',
    -  and 'Exit'
- Choosing to view departments, roles, or employees will create a table in the terminal with all the relevant data for that section clearly displayed.
- Choosing to add a department, role, or employee will prompt the user to input the necessary information needed to add a department, role, or employee.
- Choosing to update an employee's role will prompt the user to select the desired employee from a list of names, then it will prompt the user to choose which role from a list of current roles to update the employee to.
- Choosing the 'Exit' option will close the program down.

The following is a **Demo Video** to show the application's appearance and functionality:

**[Demo Video](https://drive.google.com/file/d/1FZAARYug39rsKfO-UkHkI2NlGEuI3RVU/view)**

## Credits

For this project we utilized Node.js, using the npm packages:
- `inquirer: 8.2.4`
- `dotenv: 16.3.1`
- `mysql2: 3.6.2`

## License

MIT License

## Badges

N/A

## Features

- After the user finishes their first desired action, then the app will loop to ask if their is another action the user would like to do with the database.
- The table created in the terminal is a function I made to translate an array of objects that have the same keys into a table in the terminal. This is in place of using the console.table() function because with the console.table() you cannot omit the index column that is added to the table.

## Tests

There currently are no tests set up for this application.