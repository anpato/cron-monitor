import { Router }  from 'express'
import  AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'

const AuthRouter = Router()
const auth = new AuthController()
const controller = new UserController()

AuthRouter.post('/register', controller.register)
AuthRouter.post('/login', controller.login)

export default { path: auth.path, router: AuthRouter }
