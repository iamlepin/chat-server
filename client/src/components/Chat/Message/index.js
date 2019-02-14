import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import './Message.scss'

const reverseFlex = (self) => self ? 'reversed' : ''

const Message = ({ text, time, name, userPic, self }) => (
  <div className={`msg ${reverseFlex(self)}`}>
    <Avatar className="msg__avatar" icon="user" src={userPic} />
    <div className="msg__content">
      <div className="msg__header">
        <div className={`msg-info ${reverseFlex(self)}`}>
          <span className="msg-info__item msg-info__name">{name}</span>
          <span className="msg-info__item msg-info__time">{time}</span>
        </div>
      </div>
      <div className="msg__body">{text}</div>
    </div>
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
