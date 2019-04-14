import React from 'react'
import { ChatContext } from '../components/ChatProvider/Provider'

const withChatApi = (Component) => (props) => (
  <ChatContext.Consumer>
    {(value) => <Component {...value} {...props} />}
  </ChatContext.Consumer>
)

export default withChatApi
