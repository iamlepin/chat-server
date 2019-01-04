import React, { Component } from 'react'
import { connect } from 'react-redux';

class FaceBookButton extends Component {
  // fbBtn = null

  componentDidMount = () => {
    window.FB && window.FB.XFBML.parse()
  }

  componentDidUpdate = () => {
    window.FB && window.FB.XFBML.parse()
  }

  render () {
    return (
      <div
        // ref={(x) => { this.fbBtn = x }}
        className="fb-login-button"
        data-width="300"
        data-max-rows="1"
        data-size="large"
        data-button-type="login_with"
        data-show-faces="false"
        data-auto-logout-link="false"
        data-use-continue-as="false"
      />
    )
  }
}

export default connect(
  (state) => ({
    userInfo: state.userInfo,
  }),
  null,
)(FaceBookButton)
