import { Request, Response } from "express"
const { Job } = require('../models')

export default class MonitorController {
  public path:string
  constructor() {
    this.path = '/monitor'
  }

  async notifyRan(req:Request, res:Response) {
    try {
      Job.update({
        ...res.locals.job, status:'Active'
      }, { returning: true, where:{id: req.params.job_id} }).then((resp:any) => res.send(resp))
      
    } catch (error) {
      throw error
    }
  }
}

