import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button, Avatar } from 'antd'
import PropTypes from 'prop-types'
import { SIGN_IN } from '../../constants/routes'
import './UserTopMenu.scss'

const UserTopMenu = ({ id, userPic, profileType, name, handleLogout }) => (
  <div className="user-info">
    {!id &&
      <Link to={SIGN_IN}>
        <Button ghost type="primary">LogIn</Button>
      </Link>
    }
    {id && (
      <Fragment>
      <span style={{ color: 'white', marginRight: '16px' }}>{name}</span>
        <Avatar className="user-info_image" size="large" icon="user" src={userPic} />
        <Button ghost onClick={handleLogout(profileType)}>Logout</Button>
      </Fragment>
    )
    }
  </div>)

UserTopMenu.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  userPic: PropTypes.string,
  profileType: PropTypes.string,
  handleLogout: PropTypes.func,
}

UserTopMenu.defaultProps = {
  id: '',
  name: '',
  userPic: '',
  handleLogout: () => {},
  profileType: '',
}

export default UserTopMenu
