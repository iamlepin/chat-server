import React, { Component, Fragment } from 'react'
import * as R from 'ramda'
import uuidv4 from 'uuid/v4'
import io from 'socket.io-client'
import { Card, Row, Col, Input, message } from 'antd'
import Message from './Message'
import MessageBlock from './MessageBlock'
import { getUserById } from '../../utils/user'
import PropTypes from 'prop-types'
import './Chat.scss'
import withChatApi from '../../hocs/withChatApi';

class Chat extends Component {
  state = {
    message: '',
  }

  msgInput = null
  chatBody = null

  componentDidMount = () => {
    const companionId = this.props.match.params.userId
    const { id: userId } = this.props.userInfo

    this.props.getConversation(userId, companionId)

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

  handleSendMessage = (e) => {
    const isClick = e.type === 'click'
    const isPressEnter = e.key === 'Enter'
    const canSendMessage = this.state.message && (isClick || isPressEnter)

    if (canSendMessage) {
      this.props.sendMessage(this.state.message)
      this.setState({ message: '' })
      this.msgInput.focus()
    }
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value })
  }

  renderMessage = ({ _id, tempId, author, receiveDate, sendDate, body, ...rest }) => {
    const self = author === this.props.userInfo.id

    return (
      <Message
        key={_id || tempId}
        date={receiveDate || sendDate}
        self={self}
        body={body}
        {...rest}
      />
    )
  }

  renderMessageBlock = ({ _id, tempId, author, ...rest }) => {
    const { name = '', userPic = '' } = getUserById(author, this.props.users)
    const self = author === this.props.userInfo.id
    const key = _id || tempId

    return (
      <MessageBlock
        key={key + '_block'}
        name={name}
        userPic={userPic}
        self={self}
        {...rest}
      />
    )
  }

  renderMessages = () => {
    let lastAuthor = null
    return this.props.messages.reduce((acc, msg) => {
      if (lastAuthor !== msg.author) {
        acc.push(this.renderMessageBlock(msg))
        lastAuthor = msg.author
      }
      acc.push(this.renderMessage(msg))

      return acc
    }, [])
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
                  onKeyPress={this.handleSendMessage}
                  addonAfter={
                    <div onClick={this.handleSendMessage} role="button"> Send </div> // eslint-disable-line
                  }
                />
              </Row>,
            ]}
          >
            <div ref={(x) => { this.chatBody = x }} className="chat__body">
              {this.renderMessages()}
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
