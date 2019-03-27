import { connect } from 'react-redux'
import App from './App'
import { setUserInfo, clearUserInfo } from '../../actions/userInfo'


export default connect(
  null,
  {
    setUserInfo,
    clearUserInfo,
  }
)(App)
