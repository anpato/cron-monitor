import 'dotenv/config'
import * as crypto from 'crypto'
export const PORT:number|any = process.env.PORT || 3001
export const DB_USERNAME:string | undefined = process.env.DB_USERNAME
export const DB_DATABASE:string | undefined = process.env.DB_DATABASE
export const DB_PASSWORD:string | undefined = process.env.DB_PASSWORD
export const DB_HOST:string | undefined = process.env.DB_HOST
export const DATABASE_URL:string | undefined = process.env.DATABASE_URL
export const SALT_ROUNDS:number = 12
export const APP_SECRET:string = process.env.APP_SECRET || crypto.randomBytes(15).toString('hex')
