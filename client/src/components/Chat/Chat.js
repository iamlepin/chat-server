import React, { Component } from 'react'
import io from 'socket.io-client'
import { Card, Icon, Row, Col, Input, Button } from 'antd'
import Message from './Message'
import PropTypes from 'prop-types'
import './Chat.scss'

let socket = null

export default class Chat extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }
  state = {
    message: null,
    chat: []
  }

  componentDidMount = () => {
    socket = io('http://localhost:3001') // TODO: Lepin > use env config
    socket.on('message', (msg) => this.setState((prevState) => ({
      chat: [...prevState.chat, msg]
    })))
  }

  sendMessage = () => {
    socket.emit('chat message', this.state.message)
  }


  render() {
    return (
      <Row type="flex" justify="center">
        <Col span="12">
          <Card
            className="chat"
            title="Chat"
            bodyStyle={{ height: '65vh' }}
            actions={[
              <Row type="flex" justify="center" align="middle" style={{ flexWrap: 'nowrap' }}>
                <Input value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} style={{ width: '35vw', marginRight: '10px' }} />
                <Button onClick={this.sendMessage}>Send</Button>
              </Row>
            ]}
          >
            {this.state.chat.map((msg) => <Message text={msg} />)}
          </Card>
        </Col>
      </Row>
    )
  }
}
