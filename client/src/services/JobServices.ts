import api from './Api'
import Job from '../types/job'

export const getUserJobs = async (): Promise<Job[]> => {
  try {
    const resp = await api.get('/jobs/list')
    console.log(resp.data)
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

export const updateJob = async (id: string, jobValues: Job): Promise<Job> => {
  try {
    const resp = await api.put(`/jobs/${id}`, jobValues)
    console.log(resp.data)
    return resp.data
  } catch (error) {
    throw error
  }
}
