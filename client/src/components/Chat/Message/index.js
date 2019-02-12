import React from 'react'
import { Avatar } from 'antd'

const Message = ({ text, time, name }) => (
  <div style={{ marginBottom: '10px' }}>
    <Avatar style={{ backgroundColor: '#87d068', marginRight: '10px' }} icon="user" />
    <span style={{ marginRight: '10px' }}>{time}</span>
    <span style={{ marginRight: '10px' }}>{name}</span>
    {text}
  </div>
)

export default Message
