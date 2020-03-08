'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('jobs', 'run_time', 'next_run_time')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('jobs', 'next_run_time', 'run_time')
  }
}
