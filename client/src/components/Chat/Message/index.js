import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import './Message.scss'

const reverseFlex = (self) => self ? 'reversed' : ''

const Message = ({ body, date, self }) => (
  <div className={`msg ${reverseFlex(self)}`}>
    <div className="msg__content">
      <span className="msg__date">{moment(date).format('HH:mm:ss')}</span>
      <div className="msg__body">
        {body}
      </div>
    </div>
  </div>
)

Message.propTypes = {
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  self: PropTypes.bool,
}

Message.defaultProps = {
  self: false,
}

export default Message
