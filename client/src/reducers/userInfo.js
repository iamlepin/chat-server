import { SET_USER_INFO, CLEAR_USER_INFO } from '../constants/actions'
import { storage } from '../utils/common';
import { USER_INFO } from '../constants/common';

const initState = {
  id: null,
  name: null,
  role: null,
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  profileType: null,
}

// const restoredState = storage.get(USER_INFO)
// const updatedState = restoredState ? { ...initState, ...restoredState } : initState

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
