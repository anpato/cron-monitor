'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('jobs', 'timezone', {
      type: Sequelize.STRING,
      defaultValue: 'UTC'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('jobs', 'timezone')
  }
}
