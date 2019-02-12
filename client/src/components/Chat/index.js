import { connect } from 'react-redux';
import Chat from './Chat'

const mstp = (state) => ({
  userInfo: state.userInfo,
})

export default connect(mstp)(Chat)
