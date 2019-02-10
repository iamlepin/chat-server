import React, { Component } from 'react'
import { Card, Icon, Row, Col, Avatar } from 'antd'
import Message from './Message'
import PropTypes from 'prop-types'
import './Chat.scss'

export default class Chat extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  componentDidMount = () => {

  }


  render() {
    return (
      <Row type="flex" justify="center">
        <Col span="12">
          <Card
            className="chat"
            title="Chat"
            bodyStyle={{ height: '65vh' }}
            actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
          >
          <Message />
            <Message />
            <Message />
            <Message />
          </Card>
        </Col>
      </Row>
    )
  }
}
