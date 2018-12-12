import { SET_USER_INFO, CLEAR_USER_INFO } from '../constants/actions'

export const setUserInfo = (userData) => ({
  type: SET_USER_INFO,
  payload: userData,
})

export const clearUserInfo = () => ({
  type: CLEAR_USER_INFO,
})