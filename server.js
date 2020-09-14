const mysql = require("mysql");
const inquirer = require('inquirer');
const  printTable  = require('console-table-printer');

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Mclane11-$",
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
      case "exit":
        connection.end();
        break;        
      };
    })
};

function viewAllEmployees() {
  const query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err)throw err;
    printTable(res);
    mainMenu()
  })
};
function viewByDepartment() {
  const query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err)throw err;
    inquirer.prompt(
      {
        type: "list",
        name: "department",
        message: "Which department would you like to view?",
        choices: function(){
          let deptArr = [];
          for(let i = 0; i < res.length; i++){
            deptArr.push(res[i].department_name + res [i].id);
          }
          return deptArr;
        }
      }
    )
  }).then(function(answer){
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, FROM employee JOIN")
  })
};

// mainMenu();