import { connect } from 'react-redux';
import { getUsers } from '../../actions/users'
import Chat from './Chat'

const mstp = (state) => ({
  userInfo: state.userInfo,
})

const mdtp = {
  getUsers,
}

export default connect(mstp, mdtp)(Chat)
