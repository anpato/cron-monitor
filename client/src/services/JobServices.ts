import api from './Api'

export const getUserJobs = async (): Promise<any[]> => {
  try {
    const resp = await api.get('/jobs/list')
    return resp.data
  } catch (error) {
    throw error
  }
}
