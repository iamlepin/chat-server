import React from 'react'

const FaceBookButton = () => {
  return (
    <div
      style={{ display: 'flex' }}
      className="fb-login-button"
      data-max-rows="1"
      data-size="medium"
      data-button-type="login_with"
      data-show-faces="false"
      data-auto-logout-link="true"
      data-use-continue-as="true"
      href="javascript:void(0)"
    />
  )
}

export default FaceBookButton
