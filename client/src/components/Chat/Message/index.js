import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import './Message.scss'

const Message = ({ text, time, name, userPic, self }) => (
  <div className={self ? 'message message--self' : 'message'}>
    <Avatar className="message_item" icon="user" src={userPic} />
    <span className="message_item message_name">{name}</span>
    <span className="message_item message_time">{time}</span>
    <span className="message_item">{text}</span>
  </div>
)

Message.propTypes = {
  text: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  userPic: PropTypes.string.isRequired,
  self: PropTypes.bool.isRequired,
}

export default Message
