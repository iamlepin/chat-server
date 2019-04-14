import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import uuidv4 from 'uuid/v4'
import io from 'socket.io-client'

let socket = null
export const ChatContext = React.createContext({
  chat: {
    message: '',
    messages: [],
    conversation: null,
  },
})

export default class Provider extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  static defaultProps = {
    children: null,
  }

  static contextType = ChatContext

  state = {
    ...this.context.chat,
  }

  // msgInput = null
  // chatBody = null

  componentDidMount = () => {
    console.log('context', this.context)
    // const companionId = this.props.match.params.userId
    // const { id: userId } = this.props.userInfo



    socket = io('https://localhost:3001/chat') // TODO: Lepin > use env config
    // socket.emit('get_conversation', { userId, companionId })
    // socket.on('error', this.handleChatError)
    // socket.on('chat_message_error', this.handleMessageError)
    // socket.on('get_conversation_response', this.setConversation)
    // socket.on('init_conversation_response', this.setConversation)
    // socket.on('post_message', this.updateMessage)
    // socket.on('chat_message', this.setMessage)

    // this.msgInput.focus()
    // this.scrollToBottom()
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const hasNewMessage = prevState.messages.length !== this.state.messages.length
  //   if (hasNewMessage) { this.scrollToBottom() }
  // }

  // scrollToBottom = () => {
  //   this.chatBody.scrollTop = this.chatBody.scrollHeight - this.chatBody.clientHeight
  // }

  // initConversation = () => {
  //   const companionId = this.props.match.params.userId
  //   const { id: userId } = this.props.userInfo
  //   const msgData = this.getMessageData()

  //   socket.emit('init_conversation', { userId, companionId, message: msgData })
  // }

  // setConversation = ({ conversation, messages }) => this.setState({ conversation, messages })

  // getMessageData = () => {
  //   const tmpId = uuidv4()

  //   return {
  //     tmpId,
  //     body: this.state.message,
  //     sendDate: new Date().toISOString(),
  //     author: this.props.userInfo.id,
  //     conversationId: this.state.conversation._id,
  //   }
  // }

  // handleSendMessage = (e) => {
  //   const isClick = e.type === 'click'
  //   const isPressEnter = e.key === 'Enter'
  //   const canSendMessage = this.state.message && (isClick || isPressEnter)
  //   const isBlankConversation = R.path([ 'conversation', 'blank' ], this.state)

  //   if (canSendMessage && isBlankConversation) {
  //     return this.initConversation()
  //   }
  //   if (canSendMessage) {
  //     this.sendMessage()
  //   }
  // }

  // sendMessage = () => {
  //   const msgData = this.getMessageData()
  //   socket.emit('chat_message', msgData)

  //   this.setState((prevState) => ({
  //     messages: [...prevState.messages, msgData],
  //     message: '',
  //   }))

  //   this.msgInput.focus()
  // }

  // setMessage = (msg) => this.setState((prevState) => ({
  //   messages: [...prevState.messages, msg],
  // }))

  // updateMessage = ({ tmpId, message: postedMessage }) => {
  //   this.setState(({ messages }) => {
  //     const newMessages = [ ...messages ]
  //     const targetIndex = newMessages.findIndex((msg) => msg.tmpId === tmpId)
  //     if (targetIndex !== -1) { newMessages[targetIndex] = postedMessage }
  //     return { messages: newMessages }
  //   })
  // }

  // handleChange = (e) => {
  //   this.setState({ message: e.target.value })
  // }

  // handleChatError = (error) => {
  //   // message.error(error.message)
  //   console.info(error)
  // }

  // handleMessageError = ({ msgId }) => {
  //   const messages = this.state.messages.map((message) => {
  //     if (message._id === msgId) {
  //       return { ...message, error: true }
  //     }
  //     return message
  //   })
  //   this.setState({ messages })
  // }

  render() {
    return (
      <ChatContext.Provider value={this.state}>
        {this.props.children}
      </ChatContext.Provider>
    )
  }

  componentWillUnmount () {
    socket.emit('disconnect', this.props.userInfo.userId)
  }
}
