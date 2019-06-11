import React from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/Avatar'
import './UserBar.scss'

const UserTopMenu = ({ userPic, name, profileType, handleLogout }) => (
  <div className="user-info">
    <span>{name}</span>
    <Avatar userPic={userPic} />
    <Icon className="user-info_logout" type="logout" onClick={handleLogout(profileType)} />
  </div>
)

UserTopMenu.propTypes = {
  name: PropTypes.string,
  userPic: PropTypes.string,
  profileType: PropTypes.string,
  handleLogout: PropTypes.func,
}

UserTopMenu.defaultProps = {
  name: '',
  userPic: '',
  handleLogout: () => {},
  profileType: '',
}

export default UserTopMenu
