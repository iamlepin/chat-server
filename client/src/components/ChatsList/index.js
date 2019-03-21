import { connect } from 'react-redux'
import ChatsList from './ChatsList'

export default connect(
  (state) => ({
    userInfo: state.userInfo,
  })
)(ChatsList)
