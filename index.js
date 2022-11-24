const inquirer = require("inquirer");
const connection = require('./db/connection.js');
const Department = require("./lib/department.js");
const Employee = require("./lib/employee.js");
const Role = require("./lib/role.js");

let departmentList = [];
let employeeList = [];
let roleList = [];

const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "What is the department name?",
        },
    ])

        .then(answers => {
            const newDepartment = new Department(answers.deptName)
            departmentList.push(newDepartment);
            mainMenu();
        })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
        },
        {
            type: "input",
            name: "roleId",
            message: "What is the employee's role ID?",
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the employee manager's ID?",
        },
    ])

        .then(answers => {
            const newEmployee = new Employee(answers.firstName, answers.lastName, answers.roleId, answers.managerId)
            employeeList.push(newEmployee);
            mainMenu();
        })
};

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
            name: "departmentId",
            message: "What is the department ID?",
        },
    ])

        .then(answers => {
            const newRole = new Role(answers.title, answers.salary, answers.departmentId)
            roleList.push(newRole);
            mainMenu();
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
                    viewDepartment();
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