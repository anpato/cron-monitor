const { Job, User } = require('../models')

module.exports = class JobController {
  constructor() {
    this.path = '/jobs'
  }

  async index(req, res) {
    try {
      const jobs = await Job.findAll({
        attributes: ['id', 'status', 'expression', 'run_time', 'name'],
        where: { user_id: res.locals.user.userId }
      })

      const upperCaser = str => {
        if (str.includes('_')) {
          const underCased = str.split('_')
          return `${underCased[0].charAt(0).toUpperCase() +
            underCased[0].slice(1)} ${underCased[1].charAt(0).toUpperCase() +
            underCased[1].slice(1)}`
        }
        if (!str.includes('_'))
          return str.charAt(0).toUpperCase() + str.slice(1)
      }
      let tableData = {
        headers: [],
        data: []
      }
      jobs.forEach(({ dataValues }) => {
        Object.keys(dataValues).forEach(key => {
          if (!tableData.headers.includes(upperCaser(key))) {
            tableData.headers.push(upperCaser(key))
          }
        })
        const obj = {
          id: dataValues.id,
          status: dataValues.status,
          expression: dataValues.expression,
          runTime: dataValues.run_time.toLocaleString(),
          name: dataValues.name
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
