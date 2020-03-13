'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'first_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('users', 'last_name', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'first_name'),
      queryInterface.removeColumn('users', 'last_name')
    ])
  }
}
