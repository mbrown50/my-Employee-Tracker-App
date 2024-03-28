const { Employee } = require('../models');

const employeeData = [
  {
    first_name: 'Melissa',
    last_name: 'Brown',
    role_id: 1,
    manager_id: 1
  },
  {
    first_name: 'A',
    last_name: 'B',
    role_id: 2,
    manager_id: 1
  },
  {
    first_name: 'C',
    last_name: 'D',
    role_id: 3,
    manager_id: 2
  },{

    first_name: 'E',
    last_name: 'F',
    role_id: 4,
    manager_id: 3
  },
];

const seedEmployees = () => Employee.bulkCreate(employeeData);

module.exports = seedEmployees;
