import Axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = Axios.create({
  baseURL: 'http://localhost:3001/api'
})

export default api
