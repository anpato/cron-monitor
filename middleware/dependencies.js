const helmet = require('helmet')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

module.exports = [
  helmet(),
  logger('dev'),
  cors(),
  bodyParser.urlencoded({ extended: true, limit: '100mb' }),
  bodyParser.json({ limit: '100mb' })
]
