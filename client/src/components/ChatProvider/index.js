import { connect } from 'react-redux';
import Provider from './Provider'
import { getUsers } from '../../actions/users'

const mstp = (state) => ({ // TODO: Lepin > find way to unbind user data from chat provider
  userInfo: state.userInfo,
  users: state.users,
})

const mdtp = {
  // getUsers,
}

export default connect(mstp, mdtp)(Provider)
