import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import './TopMenu.scss'
import { HOME, CHAT } from '../../constants/routes';
import withChatApi from '../../hocs/withChatApi';

const TopMenu = ({ config, messages = [] }) => (
  <Menu
    className="top-menu"
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={[HOME]}
    style={{ lineHeight: '32px' }}
  >
    {config.map(({ path, title }) => (
      <Menu.Item className="top-menu_item" key={path}>
        <Link to={path} >
          {title}
          {path === CHAT && ' ' + messages.length}
        </Link>
      </Menu.Item>
    ))}
  </Menu>
)

TopMenu.propTypes = {
  config: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default withChatApi(TopMenu)
