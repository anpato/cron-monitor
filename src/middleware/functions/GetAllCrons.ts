const { Job } = require('../../models')

export interface JobValues {
  id: string
  expression: string
  next_run_time: Date
  notification_time: string
}

interface Job{
  dataValues:JobValues
}

export default async ():Promise<JobValues[]> => {
  const jobs = await Job.findAll({ attributes: ['id', 'expression', 'next_run_time', 'notification_time'] }).map((data: Job) =>  data.dataValues )
  return jobs
}