
export const loadFacebookSDK = (updateUserInfo) => {
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: '2150863528483390',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v3.2',
      status: true,
    });

    window.FB.Event.subscribe('auth.statusChange', updateUserInfo);
    // window.FB.Event.subscribe('auth.login', ((logResp) => { console.log(logResp)}));
    // window.FB.login((login) => {
    //   console.log('login', login)
    // }, { scope: 'pages_show_list' })

    // window.FB.getLoginStatus()
  }

  (function(d, s, id){ // eslint-disable-line
    var js, fjs = d.getElementsByTagName(s)[0]; // eslint-disable-line
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js"; // eslint-disable-line
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}
