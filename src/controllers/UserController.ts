import { Request, Response, NextFunction } from 'express'
import HashPassword from '../utils/HashPassword'
import VerifyPassword from '../utils/VerifyPassword'
import AuthController from './AuthController'
const { User } = require('../models')
const auth = new AuthController()

export interface Payload {
  userId: string
  username: string
  firstName: string
}

export default class UserController {
  // async index(req, res) {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ where: { username } })
        .then()
        .catch((err: any) => {
          throw err
        })

      if (
        user &&
        (await VerifyPassword(user.dataValues.password_digest, password, res))
      ) {
        const payload: Payload = {
          userId: user.dataValues.id,
          username: username,
          firstName: user.dataValues.first_name
        }
        const token = auth.signToken(payload)
        res.send({ user: payload, token })
      } else {
        let err: any = new Error('Invalid Credentials')
        err.status = 400
        return next(err)
      }
    } catch (error) {
      throw error
    }
  }

  async register(req: Request, res: Response) {
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
        .then()
        .catch((err: any) => {
          throw new Error('Account Already In Use')
        })
      res.send(user)
    } catch (error) {
      throw error
    }
  }

  async update(req: Request, res: Response) {}

  async destroy(req: Request, res: Response) {}
}
