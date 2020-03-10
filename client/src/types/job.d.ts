export default interface Job {
  id: string
  name: string
  status?: string | null
  expression: string
  runTime: string
  next_run_time?: Date
  timezone?: string
  notification_time?: string
}
