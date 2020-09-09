DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
)
CREATE TABLE role(
 id INTEGER AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(30),
 salary DECIMAL,
 department_id INTEGER,
 FOREIGN KEY (department_id)  REFERENCES department(id)
)
CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(30),
  lastname VARCHAR(30),
  roleid INTEGER,
  FOREIGN KEY (role_id)  REFERENCES role(id)
);
