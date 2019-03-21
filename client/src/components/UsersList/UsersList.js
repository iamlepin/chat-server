import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, List, message as antdMsg, Row, Col } from 'antd'
import nodeApi from '../../api/index'
import PropTypes from 'prop-types'
import { of } from '../../utils/common';
import './UsersList.scss'
import { CHAT } from '../../constants/routes';

class UsersList extends React.Component {
  state = {
    data: [],
  }

  componentDidMount = async () => {
    const { data, error, message } = await of(nodeApi.getUsers())

    if (error) {
      antdMsg.error(message)
    } else {
      this.setState({ data })
    }
  }


  render () {
    const { data } = this.state
    const usersWithoutCurrent = data.filter(({ _id }) => _id !== this.props.userInfo.id)

    return (
      <Row className="users">
        <Col span={12}>
          <List
            className="user-list"
            bordered
            itemLayout="horizontal"
            dataSource={usersWithoutCurrent}
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

UsersList.propTypes = {

}

export default UsersList
