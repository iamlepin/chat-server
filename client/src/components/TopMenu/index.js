import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import './TopMenu.scss'

const TopMenu = ({ config }) => (
  <Menu
    className="top-menu"
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={['1']}
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
