import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setUserInfo, clearUserInfo } from '../../actions/userInfo'

class LoginWithFB extends Component {
  static propTypes = {
    setUserInfo: PropTypes.func.isRequired,
    clearUserInfo: PropTypes.func.isRequired,
  }

  state = {
    status: '',
  }

  componentDidMount = () => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId            : '2150863528483390',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v3.2'
      });

      window.FB.getLoginStatus((response) => {
        this.updateUserInfo(response)
      })

      window.FB.Event.subscribe('auth.statusChange', (response) => {
        this.updateUserInfo(response)
      })

      // window.FB.api('/me', function(response) {
      //   console.log('Good to see you, ', response);
      // });
    }.bind(this);

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  updateUserInfo = ({ authResponse, status }) => {
    if (status === 'connected') {
      this.props.setUserInfo(authResponse)
    } else {
      this.props.clearUserInfo()
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="medium"
          data-button-type="login_with"
          data-show-faces="false"
          data-auto-logout-link="false"
          data-use-continue-as="true"
          href="javascript:void(0)"
        /> */}
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="medium"
          data-button-type="login_with"
          data-show-faces="false"
          data-auto-logout-link="true"
          data-use-continue-as="true"
          href="javascript:void(0)"
        />
        <div>{this.state.status}</div>
      </React.Fragment>
    )
  }
}

export default connect(
  (state) => ({
    userInfo: state.userInfo,
  }),
  {
    setUserInfo,
    clearUserInfo,
  }
)(LoginWithFB)