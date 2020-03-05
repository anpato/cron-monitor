const AuthRouter = require('express').Router()
const AuthController = require('../controllers/AuthController')
const UserController = require('../controllers/UserController')

const auth = new AuthController()
const controller = new UserController()

AuthRouter.post('/register', controller.create)
AuthRouter.post('/login', controller.show)

module.exports = { path: auth.path, router: AuthRouter }
