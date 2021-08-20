import { http } from './http'

// Account
export const login = params => {
  return http.post('/login', params)
}

export const register = params => {
  return http.post('/register', params)
}

/**
 * check if username has been used
 * @param {username: string}
 * @returns Boolean
 */
export const checkAccount = params => {
  return http.post('/checkAccount', params)
}

// User
export const getUserByID = async params => {
  const id = params
  if (!id) return false
  const res = await http.get(`/user/${id}`)
  if (!res.data) return null
  return res.data
}

export const updateUserInfo = params => {
  return http.post('/updateUser', params)
}
