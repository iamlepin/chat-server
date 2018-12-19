import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Layout, Menu, Button } from 'antd'

import { NavLink } from 'react-router-dom';
import logo from '../../images/movie-logo.png';

const handleLogout = () => {
  window.FB.logout((res) => console.log(res))
}

const Header = ({ navLinks, userInfo }) => {

  return (
    <Layout.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '32px' }}
      >
        <Menu.Item style={{ borderRadius: '4px', marginRight: '5px' }} key="1">
          <Link to='/'> Home </Link>
        </Menu.Item>
        <Menu.Item style={{ borderRadius: '4px', marginRight: '5px' }} key="2">
          <Link to='/contacts'> Contacts </Link>
        </Menu.Item>
      </Menu>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {<span style={{ color: 'white', marginRight: '16px' }}>{userInfo.name}</span>}
        {userInfo.id && <Button type="primary" onClick={handleLogout}>Logout</Button>}
        {!userInfo.id && <Link to='/signin'>
          <Button type="primary">Sign In</Button>
        </Link>}
      </div>
    </Layout.Header>
  )
}

Header.propTypes = {
  navLinks: PropTypes.instanceOf(Array).isRequired,
  userInfo: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  navLinks: state.navLinks,
  userInfo: state.userInfo,
});


export default connect(mapStateToProps, null)(Header);
