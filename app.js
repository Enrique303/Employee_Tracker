const mysql = require("mysql");
const inquirer = require('inquirer');
const Employee = require('./employee');
const Role = require('./role');

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "employeeDB"
});

connection.connect(function(err){
  if (err) throw err;
  console.log("connect as id" + connection.threadId)
})