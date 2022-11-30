USE employees_db;

INSERT INTO department
(department_name)
VALUES 
("Accounting"),
("Human Resources"),
("Project Management"), 
("Operations");


INSERT INTO role
(title, salary, department_id)
VALUES
('Manager','125000', 1),
('Director','150000', 4),
('Business Analyst','125000', 2),
('Program Manager','100000', 3);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Sam','Davidson', 1, 2),
('Anthony','Maddatu', 4 , NULL),
('Tom','Woods', 3 , 2),
('Bob','Builder', 2, 2);