export const checkAccesTokenExpiration = (expiresIn) => {
  return Date.now() > expiresIn
}

export const refreshAccessToken = (refreshToken) => {
  alert('refreshing token', refreshToken)
}
