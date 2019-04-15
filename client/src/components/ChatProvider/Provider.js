import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import uuidv4 from 'uuid/v4'
import io from 'socket.io-client'

const socket = io('https://localhost:3001/chat')

export const ChatContext = React.createContext()

export default class Provider extends Component {
  static propTypes = {
    children: PropTypes.any,
    userInfo: PropTypes.object.isRequired,
  }

  static defaultProps = {
    children: null,
  }

  static contextType = ChatContext

  state = {
    messages: [],
    conversation: null,
  }

  componentDidMount = () => {
    console.log('context', this.context)
    // const companionId = this.props.match.params.userId
    // const { id: userId } = this.props.userInfo

    // socket = io('https://localhost:3001/chat') // TODO: Lepin > use env config
    // socket.on('error', this.handleChatError)
    socket.on('chat_message_error', this.handleMessageError)
    socket.on('get_conversation_response', this.setConversation)
    socket.on('init_conversation_response', this.setConversation)
    socket.on('post_message', this.updateMessage)
    socket.on('chat_message', this.setMessage)

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

  setConversation = ({ conversation, messages }) => this.setState({ conversation, messages })

  getConversation = () => {
    const { userId, companionId } = this.props.userInfo
    socket.emit('get_conversation', { userId, companionId })
  }

  joinRoom = (roomId) => socket.emit('join_room', roomId)

  leaveRoom = (roomId) => socket.emit('leave_room', roomId)

  getMessageData = (msgText) => {
    const tempId = uuidv4()

    return {
      tempId,
      body: msgText,
      sendDate: new Date().toISOString(),
      author: this.props.userInfo.id,
      conversationId: this.state.conversation._id,
    }
  }

  sendMessage = (msgText) => {
    const msgData = this.getMessageData(msgText)
    socket.emit('chat_message', msgData)
    this.setMessage(msgData)

    // this.msgInput.focus()
  }

  setMessage = (msg) => this.setState((prevState) => ({
    messages: [ ...prevState.messages, msg ],
  }))

  updateMessage = ({ tempId, message: postedMessage }) => {
    this.setState(({ messages }) => {
			console.log("TCL: Provider -> updateMessage -> messages", messages)
      const newMessages = messages.map((msg) => {
        if (msg.tempId === tempId) { return postedMessage }
        return msg
      })

      return { messages: newMessages }
    })
  }

  // handleChange = (e) => {
  //   this.setState({ message: e.target.value })
  // }

  handleChatError = (error) => {
    // message.error(error.message)
    console.info(error)
  }

  handleMessageError = ({ msgId }) => {
    const messages = this.state.messages.map((message) => {
      if (message._id === msgId) {
        return { ...message, error: true }
      }
      return message
    })
    this.setState({ messages })
  }

  disconnect = (userId) => socket.emit('disconnect', userId)

  render() {
    console.log('this.state: ', this.state);
    return (
      <ChatContext.Provider
        value={{
          ...this.state,
          getConversation: this.getConversation,
          sendMessage: this.sendMessage,
          joinRoom: this.joinRoom,
          leaveRoom: this.leaveRoom,
        }}
      >
        {this.props.children}
      </ChatContext.Provider>
    )
  }

  componentWillUnmount () {
    this.disconnect(this.props.userInfo.userId)
  }
}
