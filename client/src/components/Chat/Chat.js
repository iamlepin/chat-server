import React, { Component } from 'react'
import moment from 'moment'
import io from 'socket.io-client'
import { Card, Icon, Row, Col, Input, Button } from 'antd'
import Message from './Message'
import { getUserById } from '../../utils/user'
import PropTypes from 'prop-types'
import './Chat.scss'
import nodeApi from '../../api';

let socket = null

export default class Chat extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }
  state = {
    message: '',
    chat: [],
  }

  componentDidMount = () => {
    this.props.getUsers()
    socket = io('http://localhost:3001') // TODO: Lepin > use env config
    socket.on('message', (msg) => this.setState((prevState) => ({
      chat: [...prevState.chat, msg],
    })))
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
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value })
  }

  render() {
    const { users, userInfo } = this.props
    return (
      <Row type="flex" justify="center">
        <Col span={12}>
          <Card
            className="chat"
            title="Chat"
            bodyStyle={{ height: '65vh' }}
            actions={[
              <Row type="flex" justify="center" align="middle" style={{ flexWrap: 'nowrap' }}>
                <Input
                  value={this.state.message}
                  onChange={this.handleChange}
                  onKeyPress={this.sendMessage}
                  style={{ width: '35vw', marginRight: '10px' }}
                />
                <Button onClick={this.sendMessage}>Send</Button>
              </Row>,
            ]}
          >
            {this.state.chat.map(({ userId, ...rest }) => {
              const { name = '', userPic = '' } = getUserById(userId, users)
              const self = userId === userInfo.id
              return (
                <Message
                  name={name}
                  userPic={userPic}
                  self={self}
                  {...rest}
                />
              )
            })}
          </Card>
        </Col>
      </Row>
    )
  }
}
