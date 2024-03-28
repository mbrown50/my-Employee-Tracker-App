const { Department } = require('../models');

const departmentData = [
  {
    name: 'IT',
  },
  {
    name: 'Properties',
  },
  {
    name: 'Strategy',
  },
  {
    name: 'Operations',
  },
];

const seedDepartments = () => Department.bulkCreate(departmentData);

module.exports = seedDepartments;
