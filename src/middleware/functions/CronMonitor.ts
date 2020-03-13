import * as cron from 'node-cron'
import { JobValues } from './GetAllCrons'
const { Job } = require('../../models')
export default (job:JobValues) => {
  cron.schedule(job.expression, () => {
    if (job.next_run_time !== new Date()) {
      Job.update({status:'Down'}, {where:{id:job.id}})  
    }
  })
}