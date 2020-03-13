import { Request, Response, NextFunction } from "express"

import { isValidCron }  from 'cron-validator'
import * as parser  from 'cron-parser'

export const CheckExpression = (req:Request, res:Response, next:NextFunction) => {
  const { job } = res.locals

  if (isValidCron(job.expression)) {
    const nextRun = parser.parseExpression(job.expression)
    res.locals.job = {
      ...job,
      next_run_time: nextRun
        .next()
        .toString()
    }
    return next()
  }
  throw new Error('Invalid Expression')
}
