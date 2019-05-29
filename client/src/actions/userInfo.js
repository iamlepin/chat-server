import { SET_USER_INFO, CLEAR_USER_INFO } from '../constants/actions'

export const setUserInfo = ({ _id, ...rest }) => ({
  type: SET_USER_INFO,
  payload: {
    id: _id,
    ...rest,
  },
})

export const clearUserInfo = () => ({
  type: CLEAR_USER_INFO,
})
