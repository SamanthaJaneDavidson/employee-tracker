const inquirer = require("inquirer");
const connection = require('./db/connection.js');


const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "What is the department name?",
        },
    ])

        .then(answers => {
            const newDepartment = new Department(answers.internName, answers.id, answers.email, answers.school)
            employeeList.push(newIntern);
            menu();
        })
};


// Exit program 
const program_exit = () => {

    connection.end();
}

const mainmenu = () => {
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

mainmenu();