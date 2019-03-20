import { connect } from 'react-redux';
import { getUsers } from '../../actions/users'
import Chat from './Chat'

const mstp = (state) => ({
  userInfo: state.userInfo,
  users: state.users,
})

const mdtp = {
  // getUsers,
}

export default connect(mstp, mdtp)(Chat)
