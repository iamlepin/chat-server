import { serialize } from '../utils/common'

const MODE = 'cors'
const HEADERS = new Headers({
  'Content-Type': 'application/json',
})
const SERVER_URL = 'http://localhost:3001'

const sendRequest = (url, method, body) => {
  const options = {
    method,
    headers: HEADERS,
    mode: MODE,
  }
  const serializedBody = serialize(body)
  if (serializedBody) {
    options.body = serializedBody
  }
  const promise = fetch(`${SERVER_URL}${url}`, options)
    .then(response => {
      if (response.status < 500) {
        return response.json()
      }
      throw response.json()
    })
    .catch(async err => {
      const error = await err
      console.error(error.message)
    })
  return promise
}

const get = (url) => sendRequest(url)
const post = (url, body) => sendRequest(url, 'POST', body)


// api methods
const addUser = (body) => {
  const link = '/users/signup'
  return post(link, body)
}

const loginUser = (body) => {
  const link = '/users/login'
  return post(link, body)
}

const loginFbUser = (body) => {
  const link = '/users/login-fb'
  return post(link, body)
}

const checkUserName = (userName) => {
  const link = `/users/check/name/${userName}`
  return get(link)
}

const checkUserEmail = (email) => {
  const link = `/users/check/email/${email}`
  return get(link)
}

const refreshAccessToken = (body) => {
  const link = '/users/token/refresh'
  return post(link, body)
}

const nodeApi = {
  addUser,
  loginUser,
  loginFbUser,
  checkUserName,
  checkUserEmail,
  refreshAccessToken,
}

export default nodeApi
