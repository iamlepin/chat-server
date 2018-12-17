import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd'
import FaceBookButton from '../FaceBookButton'

import { NavLink } from 'react-router-dom';
import logo from '../../images/movie-logo.png';


const Header = ({ navLinks, userInfo }) => (
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
        <Link to='/signin'> Sign In </Link>
      </Menu.Item>
    </Menu>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {<span style={{ color: 'white', marginRight: '16px' }}>{userInfo.name}</span>}
      <FaceBookButton />
    </div>
  </Layout.Header>
);

Header.propTypes = {
  navLinks: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  navLinks: state.navLinks,
  userInfo: state.userInfo,
});


export default connect(mapStateToProps, null)(Header);
