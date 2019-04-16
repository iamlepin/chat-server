import React, { Component } from 'react'
import * as R from 'ramda'
import uuidv4 from 'uuid/v4'
import io from 'socket.io-client'
import { Card, Row, Col, Input, message } from 'antd'
import Message from './Message'
import { getUserById } from '../../utils/user'
import PropTypes from 'prop-types'
import './Chat.scss'
import withChatApi from '../../hocs/withChatApi';

class Chat extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }
  state = {
    message: '',
  }

  msgInput = null
  chatBody = null

  componentDidMount = () => {
    const companionId = this.props.match.params.userId
    const { id: userId } = this.props.userInfo

    this.props.getConversation(userId, companionId)
    // socket.emit('get_conversation', { userId, companionId })
    // socket.on('error', this.handleChatError)
    // socket.on('chat_message_error', this.handleMessageError)
    // socket.on('get_conversation_response', this.setConversation)
    // socket.on('post_message', this.updateMessage)
    // socket.on('chat_message', this.setMessage)

    this.msgInput.focus()
    this.scrollToBottom()
  }

  componentDidUpdate(prevProps, prevState) {
    const hasNewMessage = prevProps.messages.length !== this.props.messages.length
    if (hasNewMessage) { this.scrollToBottom() }
  }

  scrollToBottom = () => {
    this.chatBody.scrollTop = this.chatBody.scrollHeight - this.chatBody.clientHeight
  }

  // handleConversationResponse = ({ conversation, messages = [] }) => {
  //   this.setState({ conversation, messages })
  //   socket.emit('join_room', conversation.conversationId)
  // }

  handleSendMessage = (e) => {
    const isClick = e.type === 'click'
    const isPressEnter = e.key === 'Enter'
    const canSendMessage = this.state.message && (isClick || isPressEnter)

    if (canSendMessage) {
      this.props.sendMessage(this.state.message)
    }

    this.setState({ message: '' })
    this.msgInput.focus()
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value })
  }

  render() {
    const { users, userInfo } = this.props
    console.log('this.props: ', this.props);

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
              {this.props.messages.map(({ _id, tempId, author, sendDate, receiveDate, body, ...rest }) => {
                const { name = '', userPic = '' } = getUserById(author, users)
                const self = author === userInfo.id
                return (
                  <Message
                    key={_id || tempId}
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

  componentWillUnmount = () => {
    this.props.resetChatState()
  }
}


export default withChatApi(Chat)
