import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Icon } from 'antd'
import PropTypes from 'prop-types'
import { SIGN_IN, SIGN_UP } from '../../constants/routes'
import './UserBar.scss'

const UserTopMenu = ({ userPic, name, profileType, handleLogout }) => (
  <div className="user-info">
    <span>{name}</span>
    <Avatar className="user-info_image" size="large" icon="user" src={userPic} />
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
