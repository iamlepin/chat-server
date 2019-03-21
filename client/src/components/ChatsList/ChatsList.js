import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, List, message as antdMsg, Row, Col } from 'antd'
import nodeApi from '../../api/index'
import PropTypes from 'prop-types'
import { of, storage } from '../../utils/common';
import { USER_INFO } from '../../constants/common';
import './ChatsList.scss'
import { CHAT } from '../../constants/routes';

class ChatsList extends React.Component {
  state = {
    data: [],
  }

  componentDidMount = async () => {
    const userInfo = storage.get(USER_INFO)
    const { data, error, message } = await of(nodeApi.getUserChats(userInfo.id))

    if (error) {
      antdMsg.error(message)
    } else {
      this.setState({ data })
    }
  }


  render () {
    const { data } = this.state

    return (
      <Row className="users">
        <Col span={12}>
          <List
            className="user-list"
            bordered
            itemLayout="horizontal"
            dataSource={data}
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
                      {item.name}
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
