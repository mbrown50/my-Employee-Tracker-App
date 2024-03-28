// Include packages needed for this application
const inquirer = require('inquirer');
const { Department, Employee, Role } = require('./models');

const actions = ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'];

// TODO pull from DB vs hardcode in
let deparatments = [];
deparatments.push('IT', 'Properties', 'Strategy', 'Operations');

let roles = [];
roles.push('Developer', 'Engineer', 'Coder', 'Tester');

let employees = [];
employees.push('Melissa Brown', 'A B', 'C D', 'E F');

// Create an array of questions for user input
const questions = [
    //THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    {
        type: 'list',
        message: 'What would you want to do?',
        choices: actions,
        name: 'view',
    },
    //  WHEN I choose to add a department
    //THEN I am prompted to enter the name of the department and that department is added to the database
    {
        type: 'input',
        message: 'Enter department:',
        name: 'department',
        when: (answers) => {
            if (answers.view === "add a department") {
                return true;
            }
        }
    },
    //WHEN I choose to add a role
    //THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
    {
        type: 'input',
        message: 'Enter role:',
        name: 'role',
        when: (answers) => {
            if (answers.view === "add a role") {
                return true;
            }
        }
    },
    {
        type: 'input',
        message: 'Enter salary:',
        name: 'salary',
        when: (answers) => {
            if (answers.view === "add a role") {
                return true;
            }
        }
    },
    {
        // choice
        type: 'list',
        message: 'Enter role department:',
        choices: deparatments,
        name: 'role-department',
        when: (answers) => {
            if (answers.view === "add a role") {
                return true;
            }
        }
    },
    //WHEN I choose to add an employee
    //THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    {
        type: 'input',
        message: 'Enter first name:',
        name: 'firstName',
        when: (answers) => {
            if (answers.view === "add an employee") {
                return true;
            }
        }
    },
    {
        type: 'input',
        message: 'Enter last name:',
        name: 'lastName',
        when: (answers) => {
            if (answers.view === "add an employee") {
                return true;
            }
        }
    },
    {
        // choice
        type: 'list',
        message: 'Enter employee role:',
        choices: roles,
        name: 'employee-role',
        when: (answers) => {
            if (answers.view === "add an employee") {
                return true;
            }
        }
    },
    {
        // choice
        type: 'list',
        message: 'Enter employee manager:',
        choices: employees,
        name: 'manager',
        when: (answers) => {
            if (answers.view === "add an employee") {
                return true;
            }
        }
    },
    //WHEN I choose to update an employee role
    //THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
    {
        // make choice
        type: 'list',
        message: 'Enter employee:',
        choices: employees,
        name: 'employee',
        when: (answers) => {
            if (answers.view === "update an employee role") {
                return true;
            }
        }
    },
    {
        // make choice
        type: 'list',
        message: 'Enter employee role:',
        choices: roles,
        name: 'employee-role-update',
        when: (answers) => {
            if (answers.view === "update an employee role") {
                return true;
            }
        }
    },
    {
        // make choice
        type: 'confirm',
        message: 'Done?',
        name: 'is_finished',
    },
]

// Create a function to initialize app
async function init() {
    //populateListChoices(deparatments,roles,employees);

    //console.log(employees);
    // ask questions using inquierer
    return await inquirer.prompt(questions)
        //WHEN I choose to view all departments
        //THEN I am presented with a formatted table showing department names and department ids
        //WHEN I choose to view all roles
        //THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
        //WHEN I choose to view all employees
        //THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        //WHEN add, adds data
        //WHEN update, updates data
        .then(async data => {
            //console.log("then: " + data.lastName);
            if (data.is_finished) {
                //console.log("done: " + data.lastName);
                return data;
            }
            else {
                console.log(data.view);
                if (data.view === "view all departments") {
                    console.log(await Department.findAll());
                }
                else if (data.view === "view all roles") {
                    console.log(await Role.findAll());
                }
                else if (data.view === "view all employees") {
                    console.log(await Employee.findAll());
                }
                else if (data.view === " add a department") {
                    console.log(data);
                    // show all employees here 
                }
                else if (data.view === "add a role") {
                    console.log(data);
                    // show all employees here 
                }
                else if (data.view === "add an employee") {
                    console.log(data);
                    // show all employees here 
                }
                else if (data.view === "update an employee role") {
                    console.log(data);
                    // show all employees here 
                }
                else {
                    console.log("Error: " + data);
                }

                //console.log("else :" + data.lastName);
                return init();
            }
        })
}

// Function call to initialize app
init();

