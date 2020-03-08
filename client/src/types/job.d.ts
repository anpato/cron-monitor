export default interface Job {
  id: string
  name: string
  status: string | null
  expression: string
  runTime: string
}
