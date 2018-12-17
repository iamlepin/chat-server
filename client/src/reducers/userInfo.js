import { SET_USER_INFO, CLEAR_USER_INFO } from '../constants/actions'

const initState = {
  // userID: null,
  // accessToken: null,
  // data_access_expiration_time: null,
  // expiresIn: null,
  // reauthorize_required_in: null,
  // signedRequest: null,
  id: null,
  name: null,
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
