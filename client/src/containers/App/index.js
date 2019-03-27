import { connect } from 'react-redux'
import App from './App'
import { setUserInfo, clearUserInfo } from '../../actions/userInfo'
import { getUsers } from '../../actions/users'

export default connect(
  null,
  {
    setUserInfo,
    clearUserInfo,
    getUsers,
  }
)(App)
