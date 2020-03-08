'use strict'
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'tags',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  )
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsTo(models.Job)
  }
  return Tag
}
