import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import './MessageBlock.scss'

const reverseFlex = (self) => self ? 'reversed' : ''

const MessageBlock = ({ name, userPic, self }) => (
  <div className={`msg-header ${reverseFlex(self)}`}>
    <Avatar className="msg-header__avatar" icon="user" src={userPic} />
    <span className="msg-header__name">{name}</span>
  </div>
)

MessageBlock.propTypes = {
  name: PropTypes.string.isRequired,
  userPic: PropTypes.string.isRequired,
  self: PropTypes.bool,
}

MessageBlock.defaultProps = {
  self: false,
}

export default MessageBlock
