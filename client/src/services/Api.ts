import Axios, { AxiosInstance } from 'axios'
import { getToken } from './TokenService'

const api: AxiosInstance = Axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)

export default api
