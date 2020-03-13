require('dotenv').config()
module.exports = {
  development: {
    database: 'cron_monitor_development',
    host: '127.0.0.1',
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  },
  test: {
    database: 'cron_monitor_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_USERNAME,
    dialect: 'postgres',
    logging: false,
    rejectUnauthorized: false,
    dialectOptions: {
      ssl: true
    }
  }
}
