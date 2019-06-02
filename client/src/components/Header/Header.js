import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Layout } from 'antd'
import { clearUserInfo } from '../../actions/userInfo'
import { FACE_BOOK, USER_INFO } from '../../constants/common'
import { TOP_MENU_LEFT, TOP_MENU_RIGHT, CHAT } from '../../constants/routes'
import { storage } from '../../utils/common'
import UserBar from '../UserBar/UserBar'
import './Header.scss'

class Header extends React.Component {
  handleLogout = (type) => () => {
    const { logOutUser } = this.props

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

  renderMenu = (config) => (
    <div className="menu">
      {config.map(({ path, title }) => (
        <NavLink
          className="navlink"
          activeClassName="navlink--active"
          key={path}
          to={path}
        >
          {path === CHAT ? `${title} ${this.props.messages.length}` : title}
        </NavLink>
      ))}
    </div>
  )

  render () {
    const { userInfo } = this.props
    const isLoggedIn = userInfo.id

    return (
      <Layout.Header className="header">
        {this.renderMenu(TOP_MENU_LEFT)}
        {isLoggedIn
          ? <UserBar handleLogout={this.handleLogout} {...userInfo} />
          : this.renderMenu(TOP_MENU_RIGHT)
        }
      </Layout.Header>
    )
  }
}

Header.propTypes = {
  userInfo: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired,
  messages: PropTypes.array,
};

Header.defaultProps = {
  messages: [],
};

const mapStateToProps = state => ({
  navNavLinks: state.navNavLinks,
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  logOutUser: () => {
    storage.remove(USER_INFO)
    dispatch(clearUserInfo())
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);
