import { storage } from '../utils/common'
import nodeApi from '../api'
import { FACE_BOOK, USER_INFO } from '../constants/common'
import { updateUserInfo } from './user'

const loginFbUserToApp = (setUserInfo) => ({ id, name }) => {
  nodeApi.loginFbUser({
    id,
    name,
  })
    .then(response => {
      if (response && response.data) {
        const userInfo = {
          ...response.data,
          profileType: FACE_BOOK,
        }
        storage.set(USER_INFO, userInfo)
        setUserInfo(userInfo)
      } else {
        throw new Error('No response from nodeApi.loginFbUser.')
      }
    })
    .catch(err => {
      console.info(err)
    })
}

const handleStatusChange = ({ userInfo, setUserInfo, logoutUser }) => (resp) => {
  const { status } = resp

  if (!userInfo && status === 'connected') {
    window.FB.api('/me?fields=name,picture', loginFbUserToApp(setUserInfo))
    return
  }
  if (userInfo && status === 'connected') {
    updateUserInfo({ userInfo, setUserInfo })
    return
  }
  logoutUser()
}

export const loadFacebookSDK = (params) => {
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: '2150863528483390',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v3.2',
      status: true,
    });

    window.FB.Event.subscribe('auth.statusChange', handleStatusChange(params));
  }

  (function(d, s, id){ // eslint-disable-line
    var js, fjs = d.getElementsByTagName(s)[0]; // eslint-disable-line
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js"; // eslint-disable-line
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}
