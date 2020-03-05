const { Job, User } = require('../models')

module.exports = class JobController {
  constructor() {
    this.path = '/jobs'
  }

  async index(req, res) {
    try {
      const jobs = await Job.findAll({
        where: { user_id: res.locals.user.userId }
      })
      res.send(jobs)
    } catch (error) {
      throw error
    }
  }

  async show(req, res) {
    try {
      const job = await Job.findOne({
        where: { id: req.params.job_id, user_id: res.locals.user.userId }
      })
      res.send(job)
    } catch (error) {
      throw error
    }
  }

  async create(req, res) {
    try {
      const {
        user: { userId },
        job
      } = res.locals
      const user = await User.findByPk(userId)
      const newJob = await Job.create(job)
      await newJob.setUser(user)
      res.send(newJob)
    } catch (error) {}
  }

  async update(req, res) {}

  async destroy(req, res) {}
}
