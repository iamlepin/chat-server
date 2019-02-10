import React from 'react'
import { Avatar } from 'antd'

const Message = ({ text }) => (
  <div>
    <Avatar style={{ backgroundColor: '#87d068', marginRight: '10px', marginBottom: '10px' }} icon="user" />
    {text}
  </div>
)

export default Message
