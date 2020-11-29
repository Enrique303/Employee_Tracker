const mysql = require("mysql");
const inquirer = require('inquirer');
const  { printTable }  = require('console-table-printer');

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
      switch (answer.mainMenu){
      case "View All Employess":
        viewAllEmployees()
        break;
      case "View All Employess By Department":
        viewByDepartment()
        break;
      case "Add Employee":
        addEmployee()
        break;
      case "Remove Employee":
        removeEmployee()
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
  connection.query("SELECT * FROM employee", function(err, res) {
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
    printTable(res);
  })
  mainMenu();
};
const addEmployee = () => {
  connection.query("SELECT * FROM role_", (err, res) => {
    if (err) throw err

    return inquirer.prompt([

      {
        type: "input",
        name: "firstName",
        message: "Please enter the employee's first name:",

      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter the employee's last name:"
      },
      {
        type: "list",
        name: "role",
        message: "What role is this employee filling?",
        choices: () => {
          let roleArray = [];
          for (let i = 0; i < res.length; i++) {
            roleArray.push(res[i].title + " | " + res[i].id);
          }
          return roleArray;
        }
      }
    ]).then((answer) => {
      let roleID = answer.role.split("|")[1];
      connection.query("SELECT * FROM employee", (err, res) => {
        inquirer.prompt([
          {
            type: "list",
            name: "manager",
            message: "Who will this employee report to?",
            choices: () => {
              let managerArray = [];
              for (let i = 0; i < res.length; i++) {
                managerArray.push(res[i].first_name + res[i].last_name + " | " + res[i].id);
              }
              console.log()
              return managerArray;
            }
          }

        ]).then((choice) => {
          let managerID = choice.manager.split("|")[1];
          connection.query(`INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}", "${answer.lastName}", ${roleID}, ${managerID}) `, (err, res) => {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(`${answer.firstName} ${answer.lastName}  has been added to the team! Welcome Aboard!`);
          })
          console.log("");
          mainMenu();
        })
      })
    })
  })
}
const removeEmployee = () => {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        type: "list",
        name: "name",
        message: "What employee record are you deleting?",
        choices: () => {
          let employeeArray = [];
          for (let i = 0; i < res.length; i++) {
            employeeArray.push(res[i].first_name + " " + res[i].last_name + " | " + res[i].id);
          }
          return employeeArray;
        }
      },


    ]).then((choice) => {

      let employeeID = choice.name.split("|")[1];
      connection.query(
        `DELETE FROM employee WHERE employee.id = ${employeeID} `,
        (err) => {
          if (err) throw err;
          mainMenu();
        }
      )
    })
    
  });
}

// mainMenu();