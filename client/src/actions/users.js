import { SET_USER_LIST } from '../constants/actions'
import nodeApi from '../api'

export const setUsers = (users) => ({
  type: SET_USER_LIST,
  payload: users,
})

export const getUsers = () => (dispatch) => {
  nodeApi.getUsers()
    .then(({ data }) => {
      if (!data) { throw new Error('Error loading users.') }
      dispatch(setUsers(data))
    })
    .catch((err) => {
      console.error(err.message)
    })
}
