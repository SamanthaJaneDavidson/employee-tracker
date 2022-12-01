const inquirer = require("inquirer");
const connection = require('./db/connection.js');
require("console.table");


// Query to view departments
const viewDepartments = () => {

    const sql = `SELECT * FROM department`

    connection.query(sql, (err, response) => {
        if (err) throw err;
        console.table(response);
        mainMenu();
    });
};



// Inquire prompts to add departments into existing table
const addDepartment = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "What is the department name?",
        },
    ])
        .then(param => {
            connection.query(
                'INSERT INTO department SET ?',
                [param],
                function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    mainMenu();
                }
            )
        })

};


// Query to view employees 
const viewEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`

    connection.query(sql, (err, response) => {
        if (err) throw err;
        console.table(response);
        mainMenu();
    });
};


// Inquire prompts to add employees to existing table 
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the employee's role ID?",
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the employee manager's ID?",
        },
    ])
        .then(function (answers) {
            console.log(answers);
            connection.query('INSERT INTO employee SET ?', {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: answers.role_id,
                manager_id: answers.manager_id

            }, function (error) {
                if (error) throw error;
                console.log('Added employee');
                mainMenu();
            })
        })

};

// Query to view roles 
const viewRoles = () => {

    const sql = `SELECT * FROM role`

    connection.query(sql, (err, response) => {
        if (err) throw err;
        console.table(response);
        mainMenu();
    });
};
    

// Inquire prompts to add role to existing table 
const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary?",
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the department ID?",
        },
    ])

        .then(function (answers) {
            console.log(answers);
            connection.query('INSERT INTO role SET ?', {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.department_id

            }, function (error) {
                if (error) throw error;
                console.log('Added role');
                mainMenu();
            })
        })
};

// Update employee 



// Exit program 
const programExit = () => {

    connection.end();
}

const mainMenu = () => {
    return inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Exit"],
            name: "option"
        }
    ])
        .then(({ option }) => {
            console.log(option)
            switch (option) {
                case "View all departments":
                    viewDepartments();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update an employee role":
                    updateEmployee();
                    break;
                case "Exit":
                    programExit();
                    break;
            }
        });
};

mainMenu();