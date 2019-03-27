import { message } from 'antd'
import nodeApi from '../api/index'
import { USER_INFO, FACE_BOOK, APP_ACCOUNT } from '../constants/common'
import { storage, of } from './common'
import { loadFacebookSDK } from './faceBook'

export const checkAccesTokenExpiration = (expiresIn) => {
  const isExpired = Date.now() > expiresIn
  console.info('TCL: checkAccesTokenExpiration -> isExpired', isExpired)
  console.info('access token expires in: ', new Date(expiresIn))
  return isExpired
}

export const refreshAccessToken = async (body) => {
  console.log('refreshing token :', body.refreshToken) // TODO: Lepin > remove log when it doesn't needed
  // alert('refreshing token', body.refreshToken)
  const { data, error } = await of(nodeApi.refreshAccessToken(body))
  if (error) {
    console.log(error) // TODO: Lepin > remove log when it doesn't needed
    return { error }
  }
  if (data) {
    console.log('token refreshing success: ', data) // TODO: Lepin > remove log when it doesn't needed
    return { data }
  }
  return null
}

export const updateUserInfo = async ({ userInfo, setUserInfo }) => {
  const { expiresIn, refreshToken, id } = userInfo
  const isExpired = checkAccesTokenExpiration(expiresIn)
  let response
  let newUserInfo = { ...userInfo }

  if (isExpired) {
    response = await refreshAccessToken({ id, refreshToken })
  }
  if (response && response.error) {
    return message.error(response.error)
  }
  if (response && response.data) {
    newUserInfo = { ...newUserInfo, ...response.data }
  }
  storage.set(USER_INFO, newUserInfo)
  setUserInfo(newUserInfo)
}

export const restoreUserLoginState = (params) => {
  const storedUserInfo = storage.get(USER_INFO)
  if (storedUserInfo) {
    switch (storedUserInfo.profileType) {
      case APP_ACCOUNT:
        updateUserInfo({ ...params, userInfo: storedUserInfo })
        break
      case FACE_BOOK:
        loadFacebookSDK({ ...params, userInfo: storedUserInfo })
        break
      default:
        break
    }
  }
}

export const getUserById = (userId = '', users = []) => {
  const user = users.find(({ _id }) => _id === userId)
  return user || {}
}

export const getNameById = (userId = '', users = []) => {
  const user = getUserById(userId, users)
  return user ? user.name : 'Name not found.'
}
