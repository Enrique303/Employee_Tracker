const mysql = require('mysql');
const util = require('util');
require('dotenv').config()

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Mclane11-$",
  database: "employeeDB"
});

connection.connect(function(err){
  if (err) throw err;
  console.log("connect as id" + connection.threadId)
});

connection.query = util.promisify(connection.query)

module.exports = connections;