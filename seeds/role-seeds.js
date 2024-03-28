const { Role } = require('../models');

const roleData = [
  {
    title: 'Developer',
    salary: 101.99,
    department_id: 1,
  },
  {
    title: 'Engineer',
    salary: 101.99,
    department_id: 2,
  },
  {
    title: 'Coder',
    salary: 101.99,
    department_id: 3,
  },
  {
    title: 'Tester',
    salary: 101.99,
    department_id: 4,
  },
];

const seedRoles = () => Role.bulkCreate(roleData);

module.exports = seedRoles;
