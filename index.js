const inquirer = require("inquirer");
const connection = require('./db/connection.js');
const Department = require("./lib/department.js");
const Employee = require("./lib/employee.js");
const Role = require("./lib/role.js");


const viewDepartment = () => {
    connection.query("SELECT * FROM department", function(error, results){
        if(error) throw error;
        console.log(results);
        connection.end()
    })
};


const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "What is the department name?",
        },
    ])
        .then(function(answers){
            console.log(answers);
            connection.query('INSERT INTO department SET ?', {
                department_name: answers.department_name
            }, function(error){
                if (error) throw error;
                console.log('Added department');
                viewDepartment();
            })
        })

};

//add view employee 

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
            name: "managmanager_id",
            message: "What is the employee manager's ID?",
        },
    ])
    // add .then

};

//add view role

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

    //add .then
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