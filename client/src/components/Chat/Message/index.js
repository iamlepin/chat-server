import React from 'react'
import { Avatar } from 'antd'

const Message = ({ text, time, name, userPic }) => (
  <div style={{ marginBottom: '10px' }}>
    <Avatar icon="user" src={userPic} />
    <span style={{ marginRight: '10px' }}>{time}</span>
    <span style={{ marginRight: '10px' }}>{name}</span>
    {text}
  </div>
)

export default Message
