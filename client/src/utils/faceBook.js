import { message } from 'antd'
import { storage } from '../utils/common'
import { checkAccesTokenExpiration, refreshAccessToken } from '../utils/user'
import nodeApi from '../api'
import { FACE_BOOK } from '../constants/common'

const loginFbUserToApp = (setUserInfo) => ({ id, name }) => {
  nodeApi.loginFbUser({
    id,
    name,
  })
    .then(response => {
      console.log('TCL: loginFbUserToApp -> response', setUserInfo)
      if (response && response.data) {
        const userInfo = {
          ...response.data,
          profileType: FACE_BOOK,
        }
        storage.set('userInfo', userInfo)
        setUserInfo(userInfo)
      } else {
        throw new Error('No response from nodeApi.loginFbUser.')
      }
    })
    .catch(err => {
      console.info(err)
    })
}

export const updateUserInfo = async ({ userInfo, setUserInfo }) => {
  const { expiresIn, refreshToken, userId } = userInfo
  const isExpired = checkAccesTokenExpiration(expiresIn)
  let response
  let newUserInfo = { ...userInfo }

  if (isExpired) {
    response = await refreshAccessToken({ userId, refreshToken })
  }
  if (response && response.error) { message.error(response.error) }
  if (response && response.data) {
    newUserInfo = { ...newUserInfo, ...response.data }
  }
  storage.set('userInfo', newUserInfo)
  setUserInfo(newUserInfo)
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
