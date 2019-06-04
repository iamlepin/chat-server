import React, { Component } from 'react'
import { message as antdMessage } from 'antd'
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
    socketId: null,
    unreads: {},
  }

  componentDidMount = () => {
    socket.on('connected', (socketId) => this.setState({ socketId }))
    socket.on('chat_message_error', this.handleMessageError)
    socket.on('get_conversation_response', this.handleGetConversation)
    socket.on('get_conversation_error', this.handleChatError)
    socket.on('post_message', this.updateClientMessage)
    socket.on('chat_message', this.handleChatMessageResponse)
    socket.on('join_room', this.handleJoinRoom)
    socket.on('leave_room', this.handleLeaveRoom)

    socket.emit('init_chat', this.props.userInfo._id)
  }

  getConversation = (userId, companionId) => {
    socket.emit('get_conversation', { userId, companionId })
  }

  // TODO: Lepin > check messages for accidentally left unreads and update them on server
  handleGetConversation = ({ conversation, messages }) =>
    this.setState((prevState) => ({
      conversation,
      messages,
      unreads: {
        ...prevState.unreads,
        [conversation._id]: 0,
      },
    }))

  getMessageData = (msgText) => {
    const tempId = uuidv4()

    return {
      tempId,
      body: msgText,
      sentDate: new Date().toISOString(),
      author: this.props.userInfo.id,
      conversationId: this.state.conversation._id,
    }
  }

  sendMessage = (msgText) => {
    const msgData = this.getMessageData(msgText)

    this.setState(
      (prevState) => ({
        messages: [ ...prevState.messages, msgData ],
      }),
      () => socket.emit('chat_message', msgData, this.updateClientMessage)
    )
  }

  setMessage = (msgData) => this.setState(
    (prevState) => ({
      messages: [ ...prevState.messages, msgData ],
    }),
    () => socket.emit('read_message', msgData) // TODO: Lepin > replace userID with auth userId
  )

  updateClientMessage = ({ tempId, postedMessage }) => {
    this.setState(({ messages }) => {
      const newMessages = messages.map((msg) => {
        if (msg.tempId === tempId) { return postedMessage }
        return msg
      })

      return { messages: newMessages }
    })
  }

  handleChatMessageResponse = (msgData) => {
    const { conversation } = this.state
    const isActualConversationMsg = conversation && conversation._id === msgData.conversationId

    if (isActualConversationMsg) {
      this.setMessage(msgData)
      return
    }

    socket.emit('receive_message', msgData, this.updateClientUnreads)
  }

  updateClientUnreads = (conversationId) => this.setState((prevState) => {
    const unreadsItemValue = prevState.unreads[conversationId]
    const isNumValue = Number.isInteger(unreadsItemValue)

    return {
      unreads: {
        ...prevState.unreads,
        [conversationId]: isNumValue ? unreadsItemValue + 1 : 1,
      },
    }
  })

  getUreadsCounter = (conversationId) => {
    const { unreads } = this.state
    if (conversationId) {
      return unreads[conversationId]
    }

    const values = Object.values(unreads)
    return values.reduce((acc, item) => acc + item, 0)
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

  resetChatState = () => this.setState({
    conversation: null,
    messages: [],
  })

  render() {
    return (
      <ChatContext.Provider
        value={{
          ...this.state,
          getConversation: this.getConversation,
          sendMessage: this.sendMessage,
          getUreadsCounter: this.getUreadsCounter,
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
