import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivatRoute = ({
  isLoggedIn,
  path,
  redirect,
  component,
  ...rest
}) => {
  return isLoggedIn
    ? <Route path={path} component={component} {...rest} />
    : <Redirect to={redirect} {...rest} />
}

PrivatRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  redirect: PropTypes.string.isRequired,
  component: PropTypes.element.isRequired,
}

export default PrivatRoute
