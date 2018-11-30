import React from 'react'
import StateFullRedirect from './StateFullRedirect'

const RedirectPage = ({ location, ...rest }) => {
  const newProps = { ...rest, ...location.state }
  return <StateFullRedirect {...newProps} />
}

export default RedirectPage
