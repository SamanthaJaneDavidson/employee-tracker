const inquirer = require("inquirer");
const connection = require('./db/connection.js');
const Department = require("./lib/department.js");
const Employee = require("./lib/employee.js");
const Role = require("./lib/role.js");

// Query to view departments
const viewDepartments = () => {
    connection.query("SELECT * FROM department", function (error, results) {
        if (error) throw error;
        console.log(results);
        connection.end()
    })
};

// Inquire prompts to add departments into existing table
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "What is the department name?",
        },
    ])
        .then(function (answers) {
            console.log(answers);
            connection.query('INSERT INTO department SET ?', {
                department_name: answers.department_name
            }, function (error) {
                if (error) throw error;
                console.log('Added department');
                viewDepartments();
            })
        })

};

// Query to view employees 
const viewEmployees = () => {
    connection.query("SELECT * FROM employee", function (error, results) {
        if (error) throw error;
        console.log(results);
        connection.end()
    })
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
                viewEmployees();
            })
        })

};

// Query to view roles 
const viewRoles = () => {
    connection.query("SELECT * FROM role", function (error, results) {
        if (error) throw error;
        console.log(results);
        connection.end()
    })
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
            console.log('Added employee');
            viewRoles();
        })
    })
};


// Exit program 
const program_exit = () => {

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
            switch (option) {
                case "Exit":
                    return program_exit();
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
            }
        });
};

mainMenu();