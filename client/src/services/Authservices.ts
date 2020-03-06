import api from './Api'
import { LoginCredentials, SignUpCredentials } from '../types/auth'

export const loginUser = async (
  credentials: LoginCredentials
): Promise<object> => {
  try {
    const resp = await api.post('auth/login', credentials)
    const { user, token } = resp.data
    return { user, token }
  } catch (error) {
    throw error
  }
}

export const registerUser = async (
  credentials: SignUpCredentials
): Promise<number> => {
  try {
    const resp = await api.post('/auth/register', credentials)
    return resp.status
  } catch (error) {
    throw error
  }
}
