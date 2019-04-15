import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, List, message as antdMsg, Row, Col } from 'antd'
import nodeApi from '../../api/index'
import PropTypes from 'prop-types'
import { of, storage } from '../../utils/common';
import { getNameById } from '../../utils/user';
import { USER_INFO } from '../../constants/common';
import './ChatsList.scss'
import { CHAT } from '../../constants/routes';

const userInfo = storage.get(USER_INFO) || {}

class ChatsList extends React.Component {
  state = {
    chats: [],
    users: [],
  }

  componentDidMount = async () => {
    const chats = await this.getUserChats(userInfo.id)
    const users = await this.getUsers()

    const state = {}
    if (chats) { state.chats = chats }
    if (users) { state.users = users }

    this.setState(state)
  }

  getUserChats = async (userId) => {
    const { data, error, message } = await of(nodeApi.getUserChats(userId))

    if (error) {
      antdMsg.error(message)
      return null
    }
    return data
  }

  getUsers = async () => {
    const { data, error, message } = await of(nodeApi.getUsers())

    if (error) {
      antdMsg.error(message)
      return null
    }
    return data
  }

  getChatName = (chat) => {
    if (!chat) { return 'Not found.'}
    const otherMembers = chat.members.filter((id) => id !== userInfo.id)
    if (otherMembers && otherMembers.length === 1) {
      return getNameById(otherMembers[0], this.state.users)
    }
    return 'Chat name not found.'
  }

  render () {
    const { chats, users } = this.state
    const chatsWithoutBlank = chats.filter(({ messagesCount = [] }) => Boolean(messagesCount.length))

    return (
      <Row className="users">
        <Col span={12}>
          <List
            className="user-list"
            bordered
            itemLayout="horizontal"
            dataSource={chatsWithoutBlank}
            renderItem={(item) => (
              <List.Item
                className="user-list_item"
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.userPic} />}
                  title={
                    <Link
                      to={`${CHAT}/${item._id}`}
                    >
                      {this.getChatName(item)}
                    </Link>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    )
  }
}

ChatsList.propTypes = {

}

export default ChatsList
