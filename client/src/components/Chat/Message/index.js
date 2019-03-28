import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import './Message.scss'

const reverseFlex = (self) => self ? 'reversed' : ''

const Message = ({ body, date, name, userPic, self }) => (
  <div className={`msg ${reverseFlex(self)}`}>
    <Avatar className="msg__avatar" icon="user" src={userPic} />
    <div className="msg__content">
      <div className="msg__header">
        <div className="msg-info">
          <span className="msg-info__item msg-info__name">{name}</span>
          <span>{' '}</span>
          <span className="msg-info__item msg-info__date">{moment(date).format('HH:mm:ss')}</span>
        </div>
      </div>
      <div className="msg__body">{body}</div>
    </div>
  </div>
)

Message.propTypes = {
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  userPic: PropTypes.string.isRequired,
  self: PropTypes.bool.isRequired,
}

export default Message
