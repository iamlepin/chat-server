import React, { Component } from 'react'

class LoginWithFB extends Component {
  state = {
    status: '',
  }

  componentDidMount = () => {
    this.initFB()
  }

  statusChangeCallback = (response) => {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      // document.getElementById('status').innerHTML = 'Please log ' +
      //   'into this app.';
      this.setState({
        status: 'Please log into this app.'
      })
    }
  }

  initFB = () => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '2150863528483390',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
      });

      window.FB.AppEvents.logPageView();

    };

    this.checkLoginState()

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    console.log(this.checkLoginState())
  }

  checkLoginState = () => {
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    });
  }

  testAPI = () => {
    console.info('Welcome!  Fetching your information.... ');
    window.FB.api('/me', function(response) {
      console.info('Successful login for: ' + response.name);
      this.setState({
        status: 'Thanks for logging in, ' + response.name + '!'
      })
    });
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="medium"
          data-button-type="login_with"
          data-show-faces="false"
          data-auto-logout-link="false"
          data-use-continue-as="false"
        />
        <div>{this.state.status}</div>
      </React.Fragment>
    )
  }
}

export default LoginWithFB