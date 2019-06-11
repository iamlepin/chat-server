import React from 'react'
import { Avatar as AntdAvatar } from 'antd'
import PropTypes from 'prop-types'
import './Avatar.scss'

const Avatar = ({ userPic, size, icon }) => (
  <AntdAvatar className="user-info_image" size={size} icon={icon} src={userPic} />
)

Avatar.propTypes = {
  userPic: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.string,
}

Avatar.defaultProps = {
  userPic: '',
  size: 'default',
  icon: 'user',
}

export default Avatar
