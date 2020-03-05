require('dotenv').config()

const PORT = process.env.PORT || 3001
const DB_USERNAME = process.env.DB_USERNAME
const DB_DATABASE = process.env.DB_DATABASE
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DATABASE_URL = process.env.DATABASE_URL
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const APP_SECRET = process.env.APP_SECRET
module.exports = {
  PORT,
  APP_SECRET,
  DB_USERNAME,
  DB_DATABASE,
  DB_PASSWORD,
  DB_HOST,
  DATABASE_URL,
  SALT_ROUNDS
}
