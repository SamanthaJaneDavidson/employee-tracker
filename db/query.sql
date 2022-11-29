USE employees_db;

SELECT * FROM employee
JOIN role ON employee.role_id = role_id
JOIN department ON role.department_id = department.id;