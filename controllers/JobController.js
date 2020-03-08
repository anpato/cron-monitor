const { Job, User } = require('../models')
const UpperCaser = require('../middleware/functions/Uppercaser')
module.exports = class JobController {
  constructor() {
    this.path = '/jobs'
  }

  async index(req, res) {
    try {
      const jobs = await Job.findAll({
        attributes: ['id', 'name', 'status', 'expression', 'next_run_time'],
        where: { user_id: res.locals.user.userId }
      })
      let tableData = {
        headers: [],
        data: []
      }
      jobs.forEach(({ dataValues }) => {
        Object.keys(dataValues).forEach(key => {
          if (!tableData.headers.includes(UpperCaser(key))) {
            tableData.headers.push(UpperCaser(key))
          }
        })
        const obj = {
          id: dataValues.id,
          name: dataValues.name,
          status: dataValues.status,
          expression: dataValues.expression,
          runTime: dataValues.next_run_time.toLocaleString()
        }

        tableData.data.push(obj)
      })
      res.send(tableData)
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
