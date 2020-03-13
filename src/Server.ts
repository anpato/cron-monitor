import * as express from "express"
import AppRouter from './routes/AppRouter'
import GetAllCrons, { JobValues } from "./middleware/functions/GetAllCrons"
import CronMonitor from "./middleware/functions/CronMonitor"
export default class Server {
  private port: number
  private app: express.Application
  public baseroute:string
  public middleware:any[]
  constructor(port:number, middleware:any[], baseroute:string) {
    this.app = express()
    this.port = port
    this.middleware = middleware
    this.baseroute = baseroute
  }

  private listen() {
    this.app.listen(this.port, async () => {
      console.info(`Server Started on port: ${this.port}`)
      const crons = await GetAllCrons()
      crons.forEach((cron:JobValues):void => CronMonitor(cron) )
    })
  }

  private init_middleWare() {
    this.middleware.forEach(middleware => this.app.use(middleware))
  }

  private init_routes() {
    this.app.use('/api', AppRouter)
  }

  public initialize() {
    this.app.disable('x-powered-by')
    this.init_middleWare()
    this.init_routes()
    this.listen()
  }
}
