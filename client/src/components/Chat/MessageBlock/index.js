import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import './MessageBlock.scss'

const reverseFlex = (self) => self ? 'reversed' : ''

const MessageBlock = ({ body, date, name, userPic, self }) => (
  <div className={`msg-header ${reverseFlex(self)}`}>
    <Avatar className="msg-header__avatar" icon="user" src={userPic} />
    <span className="msg-header__name">{name}</span>
  </div>
)

MessageBlock.propTypes = {
  body: PropTypes.string,
  date: PropTypes.string,
  name: PropTypes.string,
  userPic: PropTypes.string,
  self: PropTypes.bool,
}

export default MessageBlock
