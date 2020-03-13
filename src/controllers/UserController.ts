import { Request, Response, ErrorRequestHandler } from 'express'
import HashPassword from '../utils/HashPassword'
import VerifyPassword from '../utils/VerifyPassword'
import AuthController from './AuthController'
const { User } = require( '../models')
const auth = new AuthController()

export interface Payload {
  userId: string,
  username: string
  firstName:string
}

export default class UserController {
  // async index(req, res) {}

  async show(req: Request, res: Response) {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username } })
    const canCompare = await VerifyPassword(
      user.dataValues.password_digest,
      password,
      res
    )
    if (canCompare && user) {
      const payload:Payload = {
        userId: user.dataValues.id,
        username: username,
        firstName: user.dataValues.first_name
      }
      const token = auth.signToken(payload)
      res.send({ user: payload, token })
    } else {
      let err = new Error('Invalid Credentials')
      // err.status = 400
      res.status(400).send({ error: err })
    }
  }

  async create(req:Request, res:Response) {
    try {
      const { username, password, email, firstName, lastName } = req.body
      const password_digest = await HashPassword(password, res)

      const user = await User.create({
        username,
        email,
        password_digest,
        firstName,
        lastName
      })
      res.send(user)
    } catch (error) {
      switch (error) {
        case 'SequelizeValidationError':
          const err = new Error('Invalid Email')
          // err.status = 400
          res.status(400).json({ error: err.message })
        default:
          throw error.message
      }
    }
  }

  async update(req:Request, res:Response) {}

  async destroy(req:Request, res:Response) {}
}


