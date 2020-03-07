const { Job, User } = require('../models')

module.exports = class JobController {
  constructor() {
    this.path = '/jobs'
  }

  async index(req, res) {
    try {
      const jobs = await Job.findAll({
        attributes: ['id', 'expression', 'run_time', 'name'],
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
        const newVals = Object.values(dataValues).map(val =>
          typeof val === 'object' ? val.toLocaleString() : val
        )
        tableData.data.push({
          key: [...newVals],
          id: dataValues.id
        })
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
