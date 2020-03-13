'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('jobs', 'wants_notifications', {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }),
      queryInterface.addColumn('jobs', 'notification_time', {
        type: Sequelize.STRING,
        defaultValue: '5 minutes'
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('jobs', 'wants_notifications'),
      queryInterface.removeColumn('jobs', 'notification_time')
    ])
  }
}
