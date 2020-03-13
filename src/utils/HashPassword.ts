import { Response } from "express"
import  * as bcrypt  from 'bcrypt'
import { SALT_ROUNDS } from '../env'

export default  async (password:string, res:Response) => {
  try {
    
    return await bcrypt.hash(password, SALT_ROUNDS)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
