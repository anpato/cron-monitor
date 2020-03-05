const HashPassword = require('../utils/HashPassword')
const VerifyPassword = require('../utils/VerifyPassword')
const AuthController = require('./AuthController')
const { User } = require('../models')

const auth = new AuthController()
class UserController {
  async index(req, res) {}

  async show(req, res) {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username } })
    if (await VerifyPassword(user.dataValues.password_digest, password)) {
      const payload = {
        userId: user.dataValues.id,
        username: username
      }
      const token = auth.signToken(payload)
      res.send({ user: payload, token })
    }
  }

  async create(req, res) {
    try {
      const { username, password, email } = req.body
      const password_digest = await HashPassword(password, res)

      const user = await User.create({
        username,
        email,
        password_digest
      })
      res.send(user)
    } catch (error) {
      switch (error.name) {
        case 'SequelizeValidationError':
          const err = new Error('Invalid Email')
          err.status = 400
          res.status(400).json({ error: err.message })
        default:
          throw error.message
      }
    }
  }

  async update(req, res) {}

  async destroy(req, res) {}
}

module.exports = UserController
