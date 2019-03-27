import { SET_USER_LIST } from '../constants/actions'

const users = (state = [], { type, payload }) => {
  switch (type) {
    case SET_USER_LIST:
      return [ ...state, ...payload ]
    default:
      return state
  }
}

export default users
