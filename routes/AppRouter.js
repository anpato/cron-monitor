const AppRouter = require('express').Router()
const JobRouter = require('./JobRouter')
const AuthRouter = require('./AuthRouter')

AppRouter.use(JobRouter.path, JobRouter.router)

AppRouter.use(AuthRouter.path, AuthRouter.router)

module.exports = AppRouter
