const { Job } = require('../../models')

export interface JobValues {
  id: string
  expression: string
  next_run_time:Date
}

interface Job{
  dataValues:JobValues
}

export default async ():Promise<JobValues[]> => {
  const jobs = await Job.findAll({ attributes: ['id', 'expression', 'next_run_time'] }).map((data:Job) => data.dataValues)
  return jobs
}