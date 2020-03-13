import { Request, Response, NextFunction } from "express"

const { Job } = require('../../models')

export const FindJob =  async (req: Request, res: Response, next: NextFunction) => {
  const job = await Job.findByPk(req.params.job_id)
  if (job) {
    res.locals.job = {
      ...job.dataValues
    }
    next()  
  }
  
}