import { Response } from "express"
import  * as bcrypt from 'bcrypt'

export default async (passwordDigest:string, password:string, res:Response) => {
  try {
    return await bcrypt.compare(password, passwordDigest)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
