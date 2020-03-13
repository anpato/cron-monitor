import { Router } from 'express'
import JobController from '../controllers/JobController'
import AuthController from '../controllers/AuthController'

const controller = new JobController()
const auth = new AuthController()
const JobRouter = Router()
JobRouter.get('/list', auth.authenticate, controller.index)
JobRouter.get('/:job_id', auth.authenticate, controller.show)
JobRouter.post('/', auth.authenticate,  controller.create)
JobRouter.put('/:job_id', auth.authenticate,  controller.update)
JobRouter.delete('/:job_id', auth.authenticate, controller.destroy)

export default { path: controller.path, router: JobRouter }
