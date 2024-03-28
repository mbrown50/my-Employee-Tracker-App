// import models
const Role = require('./Role');
const Employee = require('./Employee');
const Department = require('./Department');

// One-to-Many

// Role belongsTo Department
// A role belongs to a single department
Role.belongsTo(Department, {
  foreignKey: 'department_id',
});

// Departments have many Roles
// A department can have many roles
Department.hasMany(Role, {
  foreignKey: 'department_id'
});

/// One-to-Many

// Employee belongsTo Role
// An employee belongs to a single role
Employee.belongsTo(Role, {
  foreignKey: 'role_id',
});

// Roles have many Employees
// A role can have many employees
Role.hasMany(Employee, {
  foreignKey: 'role_id'
});

/// One-to-Many

// Employee belongsTo Employee manager
// An employee belongs to a single Employee manager
Employee.belongsTo(Employee, {
  foreignKey: 'manager_id',
});

// Employee managers have many Employees
// An employee manager can have many employees
Employee.hasMany(Employee, {
  foreignKey: 'manager_id'
});


module.exports = {
  Department,
  Role,
  Employee,
};
