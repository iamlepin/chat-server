import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import './TopMenu.scss'
import { HOME } from '../../constants/routes';

const TopMenu = ({ config }) => (
  <Menu
    className="top-menu"
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={[HOME]}
    style={{ lineHeight: '32px' }}
  >
    {config.map(({ path, title }) => (
      <Menu.Item className="top-menu_item" key={path}>
        <Link to={path} >{title}</Link>
      </Menu.Item>
    ))}
  </Menu>
)

TopMenu.propTypes = {
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
}

export default TopMenu
