import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Layout, Menu, Button } from 'antd'
import { clearUserInfo } from '../../actions/userInfo'
import { FACE_BOOK } from '../../constants/common';
import { storage } from '../../utils';

// const isUserLoggedIn = storage.get('userInfo')

const Header = ({ userInfo, logOutUser }) => {
  const { userId, userName, profileType } = userInfo

  const handleLogout = (type) => () => {
    switch (type) {
      case FACE_BOOK:
        window.FB.logout((response) => {
          console.info(response)
          logOutUser()
        })
        break;
      default:
        logOutUser()
        break;
    }
  }

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
        {<span style={{ color: 'white', marginRight: '16px' }}>{userName}</span>}
        {!userId && <Link to='/signin'>
          <Button type="primary">Sign In</Button>
        </Link>}
        {userId && <Button type="primary" onClick={handleLogout(profileType)}>Logout</Button>}
      </div>
    </Layout.Header>
  )
}

Header.propTypes = {
  userInfo: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  navLinks: state.navLinks,
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  logOutUser: () => {
    storage.remove('userInfo')
    dispatch(clearUserInfo())
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);
