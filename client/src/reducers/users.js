import { SET_USER_LIST } from '../constants/actions'

const users = (state = [], { type, payload }) => {
  switch (type) {
    case SET_USER_LIST:
		console.log('TCL: users -> SET_USER_LIST', SET_USER_LIST)
    console.log('TCL: users -> payload', payload)
    return [ ...state, ...payload ]
    default:
      return state
  }
}

export default users
