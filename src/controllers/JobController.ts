import { Request, Response } from "express"
import  UpperCaser from '../middleware/functions/Uppercaser'
import MapJobValues from '../middleware/functions/MapJobValues'
const { Job, User } = require('../models')

export default class JobController {
  public path:string
  constructor() {
    this.path = '/jobs'
  }

  async index(req:Request, res:Response) {
    try {
      const jobs = await Job.findAll({
        attributes: [
          'id',
          'name',
          'status',
          'expression',
          'next_run_time',
          'timezone',
          'notification_time',
          'wants_notifications'
        ],
        where: { user_id: res.locals.user.userId }
      })

      const tableData = MapJobValues(jobs, UpperCaser)
      res.send(tableData)
    } catch (error) {
      throw error
    }
  }

  async show(req:Request, res:Response) {
    try {
      const job = await Job.findOne({
        where: { id: req.params.job_id, user_id: res.locals.user.userId }
      })
      res.send(job)
    } catch (error) {
      throw error
    }
  }

  async create(req:Request, res:Response) {
    try {
      const {
        user: { userId },
        job
      } = res.locals
      const user = await User.findByPk(userId)
      const newJob = await Job.create(job)
      await newJob.setUser(user)
      res.send(newJob)
    } catch (error) {
      throw error
    }
  }

  async update(req:Request, res:Response) {
    try {
      const {
        name,
        expression,
        runTime,
        notificationTime,
        wantsNotifications,
        timezone
      } = req.body
      const options = {
        name,
        expression,
        next_run_time: new Date(runTime),
        timezone,
        wants_notifications: wantsNotifications,
        notification_time: notificationTime
      }
      const job = await Job.update(options, {
        where: {
          id: req.params.job_id
        },
        returning: true
      })

      const newJob = MapJobValues(job[1], UpperCaser)
      res.send(newJob.data[0])
    } catch (error) {
      throw error
    }
  }

  async destroy(req:Request, res:Response) {}
}
