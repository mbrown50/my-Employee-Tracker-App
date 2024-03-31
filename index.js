// Include packages needed for this application
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'asdfjkl;',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
);

const actions = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit'];

let departments = [];
let roles = [];
let employees = [];

// Function to populate Inquier subquestions
function populateChoices() {
    let sql = "";
    // populate the choice arrays
    sql = "SELECT id, name FROM department";
    db.query(
        sql,
        (err, rows) => {
            if (err) throw err;
            departments = rows.map((x) => {
                departments.push(x.name);
            })
        }
    )
    sql = "SELECT r.id, title, salary, name FROM role r join department d on d.id = r.department_id";
    db.query(
        sql,
        (err, rows) => {
            if (err) throw err;
            roles = rows.map((x) => {
                roles.push(x.title);
            })
        }
    )

    sql = "SELECT e.id, e.first_name, e.last_name, title, m.first_name as 'manager_first_name', m.last_name as 'manager_last_name' FROM employee e left join role r on r.id = e.role_id left join employee m on m.id = e.manager_id";
    db.query(
        sql,
        (err, rows) => {
            if (err) throw err;
            employees = rows.map((x) => {
                employees.push(x.id + " " + x.first_name + " " + x.last_name);
            })
        }
    )
}

const questions = [
    //THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    {
        type: 'list',
        message: 'What would you want to do?',
        choices: actions,
        name: 'view',
    },
    //WHEN I choose to add a department
    //THEN I am prompted to enter the name of the department and that department is added to the database
    {
        type: 'input',
        message: 'Enter department:',
        name: 'department',
        when: (answers) => {
            if (answers.view === "Add a department") {
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
            if (answers.view === "Add a role") {
                return true;
            }
        }
    },
    {
        type: 'input',
        message: 'Enter salary:',
        name: 'salary',
        when: (answers) => {
            if (answers.view === "Add a role") {
                return true;
            }
        }
    },
    {
        // choice
        type: 'list',
        message: 'Enter role department:',
        choices: departments,
        name: 'roleDepartment',
        when: (answers) => {
            if (answers.view === "Add a role") {
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
            if (answers.view === "Add an employee") {
                return true;
            }
        }
    },
    {
        type: 'input',
        message: 'Enter last name:',
        name: 'lastName',
        when: (answers) => {
            if (answers.view === "Add an employee") {
                return true;
            }
        }
    },
    {
        // choice
        type: 'list',
        message: 'Enter employee role:',
        choices: roles,
        name: 'employeeRole',
        when: (answers) => {
            if (answers.view === "Add an employee") {
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
            if (answers.view === "Add an employee") {
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
            if (answers.view === "Update an employee role") {
                return true;
            }
        }
    },
    {
        // make choice
        type: 'list',
        message: 'Enter employee role:',
        choices: roles,
        name: 'employeeRoleUpdate',
        when: (answers) => {
            if (answers.view === "Update an employee role") {
                return true;
            }
        }

    },
]

// Create an array of questions for user input
//async 
async function init() {
    return await inquirer.prompt(questions)
        .then(async data => {
            if (data.view == "Quit") {
                process.exit();
            }
            else {
                let sql = "";
                if (data.view === "View all departments") {
                    sql = "SELECT id, name FROM department order by name";
                    db.query(
                        sql,
                        (err, rows) => {
                            if (err) throw err;
                            console.table(rows);
                        }
                    )
                }
                else if (data.view === "View all roles") {
                    sql = "SELECT r.id, title, salary, name FROM role r join department d on d.id = r.department_id order by title";
                    db.query(
                        sql,
                        (err, rows) => {
                            if (err) throw err;
                            console.table(rows);
                        }
                    )
                }
                else if (data.view === "View all employees") {
                    sql = "SELECT e.id, e.first_name, e.last_name, title, m.first_name as 'manager_first_name', m.last_name as 'manager_last_name' FROM employee e left join role r on r.id = e.role_id left join employee m on m.id = e.manager_id order by e.first_name, e.last_name, e.id";
                    db.query(
                        sql,
                        (err, rows) => {
                            if (err) throw err;
                            console.table(rows);
                        }
                    )
                }
                else if (data.view === "Add a department") {      
                    sql = "INSERT INTO department (name) VALUES (\"" + data.department + "\")";
                    db.query(
                        sql,
                        (err, rows) => {
                            if (err) throw err;
                            departments.push(data.department);
                            console.log("\n\n", "Department", data.department, "added", "\n\n\n");
                        }
                    )
                }
                else if (data.view === "Add a role") {
                    const sqlDeptID = "SELECT id FROM department where name = \"" + data.roleDepartment + "\"";
                    let dID = ""
                    db.query(
                        sqlDeptID,
                        (err, rows) => {
                            if (err) throw err;                       
                            dID = rows[0].id;
                            roles.push(data.role);
                            sql = "INSERT INTO role (title, salary, department_id) VALUES (\"" + data.role + "\", \"" + data.salary + "\", " + dID + "\)";
                            db.query(
                                sql,
                                (err, rows) => {
                                    if (err) throw err;
                                    console.log("\n\n", "Role", data.role, "added", "\n\n\n");
                                }
                            )
                        }
                    )
                }
                else if (data.view === "Add an employee") {
                    const eArray = data.manager.split(" ");
                    // In a production system 2 people could have the same first and last name with same role and manager.
                    // Using the ID here as it is the unique identifyer for an employee. 
                    // Showing could compare multiple data if users don't know the employees ID
                    const sqlIDs = "SELECT r.id as rID, m.id as mID FROM role r, employee m where title = \"" + data.employeeRole + "\" and m.ID = " + eArray[0] + " and first_name = \"" + eArray[1] + "\" and last_name = \"" + eArray[2] + "\"";
                    let rID = "";
                    let mID = "";
                    db.query(
                        sqlIDs,
                        (err, rows) => {
                            if (err) throw err;
                            rID = rows[0].rID;
                            mID = rows[0].mID;
                            employees.push(rID + " " + data.firstName + " " + data.lastName);
                            sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (\"" + data.firstName + "\", \"" + data.lastName + "\", " + rID + ", " + mID + ")";

                            db.query(
                                sql,
                                (err, rows) => {
                                    if (err) throw err;
                                    console.log("\n\n", "Employee", data.firstName, data.lastName, "added", "\n\n\n");
                                }
                            )
                        }
                    )

                    sql = "SELECT e.id, e.first_name, e.last_name, title, m.first_name as 'manager_first_name', m.last_name as 'manager_last_name' FROM employee e left join role r on r.id = e.role_id left join employee m on m.id = e.manager_id";
                    db.query(
                        sql,
                        (err, rows) => {
                            if (err) throw err;
                            employees = rows.map((x) => {
                                employees.push(x.id + " " + x.first_name + " " + x.last_name);
                            })
                        }
                    )
                }
                else if (data.view === "Update an employee role") {
                    const eArray = data.employee.split(" ");
                    // In a production system 2 people could have the same first and last name with same role and manager.
                    // Using the ID here as it is the unique identifyer for an employee. 
                    // Showing could compare multiple data if users don't know the employees ID
                    const sqlIDs = "SELECT r.id as rID, e.id as eID FROM role r, employee e where title = \"" + data.employeeRoleUpdate + "\" and e.ID = " + eArray[0] + " and first_name = \"" + eArray[1] + "\" and last_name = \"" + eArray[2] + "\"";
                    let rID = "";
                    let eID = "";
                    db.query(
                        sqlIDs,
                        (err, rows) => {
                            if (err) throw err;
                            rID = rows[0].rID;
                            eID = rows[0].eID;

                            sql = "UPDATE employee SET role_id = " + rID + " where id = " + eID;
                            db.query(
                                sql,
                                (err, rows) => {
                                    if (err) throw err;
                                    console.log("\n\n", "Employee", eArray[1], eArray[2], "role updated to", data.employeeRoleUpdate, "\n\n\n");
                                }
                            )
                        }
                    )
                }
                else {
                    console.log("Error:", data);
                }
                init();
            }
        }
        )
};

populateChoices();
init();
