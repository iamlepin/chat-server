const MODE = 'cors'
const HEADERS = new Headers({
  'Content-Type': 'application/json',
})
const SERVER_URL = `http://localhost:3001`

const sendRequest = (url, method, body) => {
  const options = {
    method,
    headers: HEADERS,
    mode: MODE,
  }
  if (body) { options.body = body }
  return fetch(`${SERVER_URL}${url}`, options)
}

const get = (url) => {
  return sendRequest(url)
    .then(response => {
      if (response.status < 500) {
        console.log('response: ', response);
        return response.json()
      }
      throw response.json()
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

const post = (url, body) => {
  body = JSON.stringify(body)

  return sendRequest(url, 'POST', body)
    .then(response => {
      if (response.status < 500) {
        console.log('response: ', response);
        return response.json()
      }
      throw response.json()
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

// api methods
const addUser = (body) => {
  const link = '/users/signup'
  return post(link, body)
}

const loginUser = (body) => {
  const link = '/users/login'
  return post(link, body)
}

const getUserName = (userName) => {
  const link = `/users/check/${userName}`
  return get(link)
}

const nodeApi = {
  addUser,
  loginUser,
  getUserName,
}

export default nodeApi
