const mysql = require('mysql');
const Employee = require('./employee');

class Role extends Employee {
  constructor(firstName, lastName, role_id, manager_id, title, salary, department_id){
    super(firstName, lastName, role_id, manager_id)
    this.title = title
    this.salary = salary
    this.department_id = department_id
  }
}

module.exports = Role