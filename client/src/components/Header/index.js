import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd'
import { clearUserInfo } from '../../actions/userInfo'
import { FACE_BOOK, USER_INFO } from '../../constants/common'
import { TOP_MENU } from '../../constants/routes'
import { storage } from '../../utils/common'
import TopMenu from '../TopMenu'
import UserTopMenu from '../UserTopMenu'
import './Header.scss'

const Header = ({ userInfo, logOutUser }) => {

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
      <TopMenu config={TOP_MENU} />
      <UserTopMenu handleLogout={handleLogout} {...userInfo} />
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
    storage.remove(USER_INFO)
    dispatch(clearUserInfo())
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);
