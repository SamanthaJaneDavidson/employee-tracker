DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
	id INT auto_increment NOT NULL,
    department_name VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
    );
    
CREATE TABLE role (
	id INT auto_increment NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id),
	PRIMARY KEY (id)
    );

CREATE TABLE employee (
	id INT auto_increment NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(30) NOT NULL,
    manager_id INT,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id),
	PRIMARY KEY (id)
    );
