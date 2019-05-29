import React, { Component } from 'react'
import { message as antdMessage } from 'antd'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import uuidv4 from 'uuid/v4'
import io from 'socket.io-client'

const socket = io('https://localhost:3001/chat')

export const ChatContext = React.createContext()

const INITIAL_STATE = {
  messages: [],
  conversation: null,
  socketId: null,
  // currentRoom: null, // ???
}
export default class Provider extends Component {
  static propTypes = {
    children: PropTypes.any,
    userInfo: PropTypes.object.isRequired,
  }

  static defaultProps = {
    children: null,
  }

  static contextType = ChatContext

  state = INITIAL_STATE

  componentDidMount = () => {
    socket.on('connected', (socketId) => this.setState({ socketId })) // ???
    socket.on('chat_message_error', this.handleMessageError)
    socket.on('get_conversation_response', this.setConversation)
    socket.on('get_conversation_error', this.handleChatError)
    socket.on('post_message', this.updateMessage)
    socket.on('chat_message', this.setMessage)
    socket.on('join_room', this.handleJoinRoom)
    socket.on('leave_room', this.handleLeaveRoom)
  }

  setConversation = ({ conversation, messages }) => this.setState({ conversation, messages })

  getConversation = (userId, companionId) => {
    socket.emit('get_conversation', { userId, companionId })
  }

  // joinRoom = (roomId) => socket.emit('join_room', roomId)

  // handleJoinRoom = (roomId) => this.setState({ currentRoom: roomId })

  // leaveRoom = (roomId) => socket.emit('leave_room', roomId)

  // handleLeaveRoom = () => this.setState({ currentRoom: null })

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
    socket.emit('chat_message', msgData, this.updateMessage)
    this.setMessage(msgData)
  }

  setMessage = (msg) => this.setState((prevState) => ({
    messages: [ ...prevState.messages, msg ],
  }))

  updateMessage = ({ tempId, message: postedMessage }) => {
    this.setState(({ messages }) => {
      const newMessages = messages.map((msg) => {
        if (msg.tempId === tempId) { return postedMessage }
        return msg
      })

      return { messages: newMessages }
    })
  }

  handleChatError = (error) => {
    antdMessage.error('Something going wrong... try again later.')
    console.error(error.message)
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

  resetChatState = () => this.setState(INITIAL_STATE)

  render() {
    console.log(this.state)
    return (
      <ChatContext.Provider
        value={{
          ...this.state,
          getConversation: this.getConversation,
          sendMessage: this.sendMessage,
          joinRoom: this.joinRoom,
          leaveRoom: this.leaveRoom,
          resetChatState: this.resetChatState,
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
