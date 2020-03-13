import  * as helmet  from 'helmet'
import * as logger  from 'morgan'
import * as cors  from 'cors'
import  * as bodyParser  from 'body-parser'

export default [
  helmet(),
  logger('dev'),
  cors(),
  bodyParser.urlencoded({ extended: true, limit: '100mb' }),
  bodyParser.json({ limit: '100mb' })
]
