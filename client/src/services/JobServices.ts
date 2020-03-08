import api from './Api'
import Job from '../types/job'

export const getUserJobs = async (): Promise<any[]> => {
  try {
    const resp = await api.get('/jobs/list')
    return resp.data
  } catch (error) {
    throw error
  }
}

export const createNewJob = async (job: Job): Promise<object> => {
  try {
    const resp = await api.post('/jobs', job)
    return resp.data
  } catch (error) {
    throw error
  }
}
