import { connect } from 'react-redux'
import App from './App'
import { setUserInfo, clearUserInfo } from '../../actions/userInfo'
import { getUsers } from '../../actions/users'

export default connect(
  (state) => ({
    userInfo: state.userInfo,
  }),
  {
    setUserInfo,
    clearUserInfo,
    getUsers,
  }
)(App)
