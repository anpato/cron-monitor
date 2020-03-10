export default interface Job {
  id: string
  name: string
  status?: string | null
  expression: string
  runTime: string
  timezone: string
  notificationTime?: string
  wantsNotifications: boolean
}
