INSERT INTO department
(dept_name)
VALUES 
("Accounting", "Human Resources", "Project Management", "Operations")


INSERT INTO job_role
(title, salary, department)
VALUES
('Manager',
'125000',
'Accounting'
),
('Director',
'Human Resources',
'150000'
),
('Business Analyst',
'Project Management',
'125000'
),
('Operations',
'Program Manager',
'100000'
)

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Sam',
'Davidson',
'1' -- need to be relational to the other tables
'2' -- need to be relational to the other tables
),
('Anthony',
'Maddatu',
'3'
'4'
),
('Tom',
'Woods',
'5'
'6'
),
('Bob',
'Builder',
'7'
'8'
)