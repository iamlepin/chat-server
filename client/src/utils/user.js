import nodeApi from '../api/index'

export const checkAccesTokenExpiration = (expiresIn) => {
  const isExpired = Date.now() > expiresIn
  console.info('TCL: checkAccesTokenExpiration -> isExpired', isExpired)
  console.info('access token expires in: ', new Date(expiresIn))
  return isExpired
}

export const refreshAccessToken = async (body) => {
  console.log('refreshing token :', body.refreshToken) // TODO: Lepin > remove log when it doesn't needed
  // alert('refreshing token', body.refreshToken)
  const { data, error } = await nodeApi.refreshAccessToken(body)
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
