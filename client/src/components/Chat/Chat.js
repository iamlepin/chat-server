import React, { Component } from 'react'
import moment from 'moment'
import io from 'socket.io-client'
import { Card, Row, Col, Input } from 'antd'
import Message from './Message'
import { getUserById } from '../../utils/user'
import PropTypes from 'prop-types'
import './Chat.scss'

let socket = null
const tabList = [
  {
    key: 'flood',
    tab: 'Flood',
  },
  {
    key: 'tech',
    tab: 'Tech',
  },
]

export default class Chat extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }
  state = {
    message: '',
    chat: [],
  }

  msgInput = null
  chatBody = null

  componentDidMount = () => {
    this.props.getUsers()
    socket = io('https://localhost:3001') // TODO: Lepin > use env config
    socket.on('message', (msg) => this.setState((prevState) => ({
      chat: [...prevState.chat, msg],
    })))
    this.msgInput.focus()
    this.scrollToBottom()
  }

  componentDidUpdate(prevProps, prevState) {
    const hasNewMessage = prevState.chat.length !== this.state.chat.length
    if (hasNewMessage) { this.scrollToBottom() }
  }

  scrollToBottom = () => {
    this.chatBody.scrollTop = this.chatBody.scrollHeight - this.chatBody.clientHeight
  }

  sendMessage = (e) => {
    const isClick = e.type === 'click'
    const isPressEnter = e.key === 'Enter'
    const { message } = this.state
    const canSendMessage = message && (isClick || isPressEnter)
    if (canSendMessage) {
      const msgData = { text: message, userId: this.props.userInfo.id, time: moment().format('hh:mm:ss')}
			console.log('TCL: Chat -> sendMessage -> data', msgData)
      socket.emit('chat message', msgData)
      this.setState((prevState) => ({
        chat: [...prevState.chat, msgData],
        message: '',
      }))
    }
    this.msgInput.focus()
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value })
  }

  render() {
    const { users, userInfo } = this.props
    return (
      <Row>
        <Col>
          <Card
            className="chat"
            // title="Chat"
            tabList={tabList}
            actions={[
              <Row className="chat__footer">
                <Input
                  ref={(x) => { this.msgInput = x }}
                  value={this.state.message}
                  onChange={this.handleChange}
                  onKeyPress={this.sendMessage}
                  addonAfter={
                    <div onClick={this.sendMessage} role="button"> Send </div> // eslint-disable-line
                  }
                />
              </Row>,
            ]}
          >
            <div ref={(x) => { this.chatBody = x }} className="chat__body">
              {this.state.chat.map(({ userId, ...rest }) => {
                const { _id, name = '', userPic = '' } = getUserById(userId, users)
                const self = userId === userInfo.id
                return (
                  <Message
                    key={_id}
                    name={name}
                    userPic={userPic}
                    self={self}
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
}
