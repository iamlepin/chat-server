import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Layout, Menu, Button } from 'antd'
import { clearUserInfo } from '../../actions/userInfo'
import { FACE_BOOK, USER_INFO } from '../../constants/common'
import { TOP_MENU } from '../../constants/routes'
import { storage } from '../../utils/common'
import TopMenu from '../TopMenu'
import './Header.scss'

const Header = ({ userInfo, logOutUser }) => {
  const { userId, userName, profileType, userPic } = userInfo

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
      <div className="user-info">
        {!userId &&
          <Link to="/signin">
            <Button type="primary">Sign In</Button>
          </Link>
        }
        {userId && (
          <Fragment>
            <span style={{ color: 'white', marginRight: '16px' }}>{userName}</span>
            <img className="user-info_image" src={userPic} alt="user avatar" />
            <Button type="primary" onClick={handleLogout(profileType)}>Logout</Button>
          </Fragment>
        )
        }
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
    storage.remove(USER_INFO)
    dispatch(clearUserInfo())
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);
