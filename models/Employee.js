class Employee extends Model { }


Employee.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,

    },
    first_name: {
      type: DataTypes.STRING(30)
    },
    last_name: {
      type: DataTypes.STRING(30)
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Role',
        key: 'id',
      }
    },
    manager_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Employee',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Employee',
  }
);

module.exports = Employee;
