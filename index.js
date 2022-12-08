const inquirer = require("inquirer");
const connection = require('./db/connection.js');
// require("console.table");


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
        .then(function (answers) {
            connection.query('INSERT INTO department SET ?', {
                department_name: answers.department_name,

            }, function (error) {
                if (error) throw error;
                console.log('Added department');
                mainMenu();
            })
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

// // Update employee 
const employeeQuery = (query) => {

    return new Promise((resolve, reject) => {
        connection.query(query, function (err, results) {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

const updateEmployee = async () => {
    try {
        const employeeResults = await employeeQuery('SELECT * FROM employee');

        const employeeChoices = employeeResults.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        const roleResults = await employeeQuery('SELECT * FROM role');

        const roleChoices = roleResults.map(({ id, title }) => ({
            name: `${title}`,
            value: id
        }));

        return inquirer.prompt([
            {
                type: "list",
                name: "update_employee",
                message: "Select employee to update role?",
                choices: employeeChoices,
            },
            {
                type: "list",
                name: "new_role",
                message: "What is the new role?",
                choices: roleChoices,
            },
        ])

            .then(function (answers) {
                console.log(answers)
                connection.query('UPDATE employee SET role = ? WHERE ?', [
                    answers.new_role,
                    answers.update_employee
                ],

                function (error) {
                    if (error) throw error;
                    console.log('Updated employee role');
                    mainMenu();
                })
            })
    }

    catch (err) {
        console.log("No employees found");
    }
};


// Exit program 
const programExit = () => {

    connection.end();
}

const mainMenu = () => {
    inquirer.prompt([
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