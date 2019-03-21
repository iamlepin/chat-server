import { connect } from 'react-redux'
import UsersList from './UsersList'

export default connect(
  (state) => ({
    userInfo: state.userInfo,
  })
)(UsersList)
