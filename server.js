const mysql = require("mysql");
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "employeeDB"
});

connection.connect(function(err){
  if (err) throw err;
  console.log("connect as id" + connection.threadId);
  mainMenu()
});

function mainMenu() {
  inquirer
    .prompt({
      name: "mainMenu",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employess",
        "View All Employess By Department",
        "view All Employess By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "exit"
      ]
    })
    .then(function(answer){
      switch (answer.action){
      case "View All Employess":
        viewAllEmployees()
        break;
      case "View All Employess By Department":
        viewByDepartment()
        break;
      case "view All Employess By Manager":
        viewByManager()
        break;
      case "Add Employee":
        addEmployee()
        break;
      case "Remove Employee":
        removeEmployee()
        break;
      case "Update Employee Role":
        updateEmployeeRole()
        break;
      case "Update Employee Manager":
        updateEmployeeManager()
        break;
      default:
        exit();
      };
    })
}

// mainMenu();