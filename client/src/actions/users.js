import { SET_USER_LIST } from '../constants/actions'
import nodeApi from '../api'

export const setUsers = (users) => ({
  type: SET_USER_LIST,
  payload: users,
})

export const getUsers = () => (dispatch) => {
  nodeApi.getUsers()
    .then(({ users }) => {
      if (!users) { throw new Error('Error loading users.')}
      dispatch(setUsers(users))
    })
    .catch((err) => {
      console.error(err.message)
    })
}
