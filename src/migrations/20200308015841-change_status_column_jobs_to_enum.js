'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('jobs', 'status'),
      queryInterface.addColumn('jobs', 'status', {
        type: Sequelize.ENUM('Pending', 'Active', 'Down'),
        defaultValue: 'Pending',
        allowNull: false
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('jobs', 'status')
  }
}
