class Role extends Model {}

// set up fields and rules for Product model
Role.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(30),
    },
    salary: {
      type:DataTypes.DECIMAL(10,2),
      is_decimal: true
    },
    department_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'Department',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Role',
  }
);

module.exports = Role;