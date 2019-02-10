import React, { Component } from 'react'
import { Card, Icon, Row, Col, Input, Button } from 'antd'
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
            actions={[
              <Row type="flex" justify="center" align="middle" style={{ flexWrap: 'nowrap' }}>
                <Input style={{ width: '35vw', marginRight: '10px' }} /><Button>Send</Button>
              </Row>
            ]}
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
