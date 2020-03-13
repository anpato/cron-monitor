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
      next_run_time: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM('Pending', 'Active', 'Down'),
        defaultValue: 'Pending',
        allowNull: false
      },
      timezone: {
        type: DataTypes.STRING,
        defaultValue: 'UTC'
      },
      wants_notifications: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      notification_time: {
        type: DataTypes.STRING,
        defaultValue: '5 minutes'
      },
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
    Job.hasMany(models.Tag)
  }
  return Job
}
