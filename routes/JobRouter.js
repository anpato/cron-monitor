const JobRouter = require('express').Router()
const JobController = require('../controllers/JobController')
const AuthController = require('../controllers/AuthController')
const CheckExpression = require('../middleware/validators/CheckExpression')
const controller = new JobController()
const auth = new AuthController()

JobRouter.get('/list', auth.authenticate, controller.index)
JobRouter.get('/:job_id', auth.authenticate, controller.show)
JobRouter.post('/', auth.authenticate, CheckExpression, controller.create)
JobRouter.put('/:job_id', auth.authenticate, CheckExpression, controller.update)
JobRouter.delete('/:job_id', auth.authenticate, controller.destroy)

module.exports = { path: controller.path, router: JobRouter }
