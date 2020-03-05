'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('jobs', 'user_id', {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('jobs', 'user_id')
  }
}
