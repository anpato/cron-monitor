import { Router } from 'express'
import JobRouter  from './JobRouter'
import AuthRouter  from './AuthRouter'
import MonitorRouter from './MonitorRouter'
const AppRouter = Router()

AppRouter.use(AuthRouter.path, AuthRouter.router)
AppRouter.use(JobRouter.path, JobRouter.router)
AppRouter.use(MonitorRouter.path, MonitorRouter.router)

export default AppRouter
