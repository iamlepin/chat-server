import { SET_USER_INFO, CLEAR_USER_INFO } from '../constants/actions'

const initState = {
  id: null,
  name: null,
  role: null,
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  profileType: null,
}

const userInfo = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_USER_INFO:
      return { ...state, ...payload }
    case CLEAR_USER_INFO:
      return initState
    default:
      return state
  }
}

export default userInfo
