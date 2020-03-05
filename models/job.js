'use strict'
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define(
    'Job',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      expression: DataTypes.STRING,
      run_time: DataTypes.DATE,
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      underscored: true
    }
  )
  Job.associate = function(models) {
    // associations can be defined here
    Job.belongsTo(models.User)
  }
  return Job
}
