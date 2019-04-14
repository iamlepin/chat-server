import { connect } from 'react-redux';
import Provider from './Provider'
import { getUsers } from '../../actions/users'

const mstp = (state) => ({
  userInfo: state.userInfo,
  users: state.users,
})

const mdtp = {
  // getUsers,
}

export default connect(mstp, mdtp)(Provider)
