DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  UNIQUE(name)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL,
    UNIQUE(title)
);

CREATE TABLE employee (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   first_name VARCHAR(30),
   last_name VARCHAR(30),
   role_id INT,
   manager_id INT,
   FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
   FOREIGN KEY (manager_id) REFERENCES employee(id),
   UNIQUE(first_name, last_name, role_id, manager_id)
);
