import React, { Component } from 'react'
import * as R from 'ramda'
import uuidv4 from 'uuid/v4'
import io from 'socket.io-client'
import { Card, Row, Col, Input, message } from 'antd'
import Message from './Message'
import { getUserById } from '../../utils/user'
import PropTypes from 'prop-types'
import './Chat.scss'

let socket = null

export default class Chat extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }
  state = {
    message: '',
    messages: [],
    conversation: null,
    socketId: null,
    currentRoom: null,
  }

  msgInput = null
  chatBody = null

  componentDidMount = () => {
    const companionId = this.props.match.params.userId
    const { id: userId } = this.props.userInfo

    socket = io('https://localhost:3001/chat') // TODO: Lepin > use env config
    socket.emit('get_conversation', { userId, companionId })
    socket.on('connected', (socketId) => this.setState({ socketId }))
    socket.on('error', this.handleChatError)
    socket.on('chat_message_error', this.handleMessageError)
    socket.on('get_conversation_response', this.setConversation)
    socket.on('post_message', this.updateMessage)
    socket.on('chat_message', this.setMessage)

    this.msgInput.focus()
    this.scrollToBottom()
  }

  componentDidUpdate(prevProps, prevState) {
    const hasNewMessage = prevState.messages.length !== this.state.messages.length
    if (hasNewMessage) { this.scrollToBottom() }
  }

  scrollToBottom = () => {
    this.chatBody.scrollTop = this.chatBody.scrollHeight - this.chatBody.clientHeight
  }

  handleConversationResponse = ({ conversation, messages = [] }) => {
    this.setState({ conversation, messages })
    socket.emit('join_room', conversation.conversationId)
  }


  getMessageData = () => {
    const tmpId = uuidv4()

    return {
      tmpId,
      body: this.state.message,
      sendDate: new Date().toISOString(),
      author: this.props.userInfo.id,
      conversationId: this.state.conversation._id,
    }
  }

  handleSendMessage = (e) => {
    const isClick = e.type === 'click'
    const isPressEnter = e.key === 'Enter'
    const canSendMessage = this.state.message && (isClick || isPressEnter)

    if (canSendMessage) {
      this.sendMessage()
    }
  }

  sendMessage = () => {
    const msgData = this.getMessageData()
    socket.emit('chat_message', msgData)

    this.setState((prevState) => ({
      messages: [...prevState.messages, msgData],
      message: '',
    }))

    this.msgInput.focus()
  }

  setMessage = (msg) => this.setState((prevState) => ({
    messages: [...prevState.messages, msg],
  }))

  updateMessage = ({ tmpId, message: postedMessage }) => {
    this.setState(({ messages }) => {
      const newMessages = [ ...messages ]
      const targetIndex = newMessages.findIndex((msg) => msg.tmpId === tmpId)
      if (targetIndex !== -1) { newMessages[targetIndex] = postedMessage }
      return { messages: newMessages }
    })
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value })
  }

  handleChatError = (error) => {
    message.error(error.message)
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

  render() {
    const { users, userInfo } = this.props

    return (
      <Row>
        <Col>
          <Card
            className="chat"
            actions={[
              <Row className="chat__footer">
                <Input
                  ref={(x) => { this.msgInput = x }}
                  value={this.state.message}
                  onChange={this.handleChange}
                  onKeyPress={this.sendMessage}
                  addonAfter={
                    <div onClick={this.handleSendMessage} role="button"> Send </div> // eslint-disable-line
                  }
                />
              </Row>,
            ]}
          >
            <div ref={(x) => { this.chatBody = x }} className="chat__body">
              {this.state.messages.map(({ _id, tmpId, author, sendDate, receiveDate, body, ...rest }) => {
                const { name = '', userPic = '' } = getUserById(author, users)
                const self = author === userInfo.id
                return (
                  <Message
                    key={_id || tmpId}
                    name={name}
                    date={receiveDate || sendDate}
                    userPic={userPic}
                    self={self}
                    body={body}
                    {...rest}
                  />
                )
              })}
            </div>
          </Card>
        </Col>
      </Row>
    )
  }

  componentWillUnmount () {
    socket.emit('disconnect', this.state.conversation._id)
  }
}
