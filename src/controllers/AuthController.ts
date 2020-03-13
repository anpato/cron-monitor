import { Response, Request, NextFunction } from "express"
import  * as jwt from 'jsonwebtoken'
import  { APP_SECRET } from '../env'
import { Payload } from "./UserController"

export default class AuthController {
  public readonly path:string
  constructor() {
    this.path = '/auth'
  }
  public authenticate = (req:Request, res:Response, next:NextFunction) => {
    try {
      const token = req.headers.authorization!.split(' ')[1]
      const data = jwt.verify(token, APP_SECRET)
      res.locals.user = data
      next()
    } catch (error) {
      res.status(403).send({ error: 'Unauthorized' })
    }
  }

  public signToken = (payload:Payload) => {
    const token = jwt.sign(payload, APP_SECRET)
    return token
  }
}

