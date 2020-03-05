const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { APP_SECRET, SALT_ROUNDS } = require('../env')

class AuthController {
  constructor() {
    this.path = '/auth'
  }
  authenticate = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const data = jwt.verify(token, APP_SECRET)
      res.locals.user = data
      next()
    } catch (error) {
      res.status(403).send({ error: 'Unauthorized' })
    }
  }

  signToken = payload => {
    const token = jwt.sign(payload, APP_SECRET)
    return token
  }
}

module.exports = AuthController
