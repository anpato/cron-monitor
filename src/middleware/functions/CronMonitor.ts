import * as cron from 'node-cron'
import * as moment from 'moment'
import { JobValues } from './GetAllCrons'
const { Job } = require('../../models')
export default (job: JobValues):void => {
  let [time, unit ]:string[] = job.notification_time.split(' ')
  const warnLimit: moment.Moment = moment(job.next_run_time).utc().add({ [unit]: parseInt(time) })
  const nextRun: moment.Moment = moment(job.next_run_time).utc()
  cron.schedule(job.expression, () => {
    if (nextRun !==  warnLimit || nextRun !== moment().utc()) {
      Job.update({status:'Down'}, {where:{id:job.id}})  
    }
  })
}