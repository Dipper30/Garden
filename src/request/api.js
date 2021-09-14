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

/**
 * create new clock
 * @param {user_id: number, set_time: number, desc:string, title:string}
 * @returns {code, msg} 201 if succeed
 */
export const createClock = params => {
  return http.post('/clock', params)
}

/**
 * get all clocks by user id
 * @param {user_id: number, locale: number}
 * @returns {
 *  code, msg, data: {total: number, future: [], past: []}
 * }
 */
export const getClocksByUserID = async params => {
  const { user_id, locale } = params
  const res = await http.get(`/clock?user_id=${user_id}&locale=${locale}`)
  if (!res.data) return null
  return res.data
}

export const deleteClockByID = async params => {
  return http.post('/deleteClock', params)
}