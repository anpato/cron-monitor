import { Router } from 'express'
import MonitorController from '../controllers/MonitorController'
import * as queries from '../middleware/queries'
import {CheckExpression} from '../middleware/validators'
const MonitorRouter = Router()
const controller = new MonitorController()

MonitorRouter.get('/:job_id',queries.FindJob, CheckExpression, controller.notifyRan)

export default {router: MonitorRouter, path: controller.path}
