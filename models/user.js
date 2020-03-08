'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      username: { type: DataTypes.STRING, unique: true },
      password_digest: DataTypes.TEXT,
      email: {
        type: DataTypes.TEXT,
        unique: true,
        validate: {
          isEmail: true
        }
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
  User.associate = function(models) {
    User.hasMany(models.Job)
  }
  return User
}
