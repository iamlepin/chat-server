import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import { SIGN_IN } from '../../constants/routes'
import './UserTopMenu.scss'

const UserTopMenu = ({ userId, userPic, profileType, userName, handleLogout }) => (
  <div className="user-info">
    {!userId &&
      <Link to={SIGN_IN}>
        <Button ghost type="primary">LogIn</Button>
      </Link>
    }
    {userId && (
      <Fragment>
        <span style={{ color: 'white', marginRight: '16px' }}>{userName}</span>
        <img className="user-info_image" src={userPic} alt="user avatar" />
        <Button ghost onClick={handleLogout(profileType)}>Logout</Button>
      </Fragment>
    )
    }
  </div>)

UserTopMenu.propTypes = {
  userId: PropTypes.string,
  userPic: PropTypes.string,
  profileType: PropTypes.string,
  userName: PropTypes.string,
  handleLogout: PropTypes.func,
}

UserTopMenu.defaultProps = {
  userId: '',
  userPic: '',
  handleLogout: () => {},
  profileType: '',
  userName: '',
}

export default UserTopMenu
