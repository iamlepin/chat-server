const MODE = 'cors'

const HEADERS = new Headers({
  'Content-Type': 'application/json',
})

const SERVER_URL = `http://localhost:3001`

const post = (url, body) => {
  body = JSON.stringify(body)

  return fetch(`${SERVER_URL}${url}`, {
    method: 'POST',
    headers: HEADERS,
    mode: MODE,
    body,
  })
    .then(response => response.json())
    .catch(err => console.log(err))
}

const addUser = (body) => {
  const link = '/users/signup'
  return post(link, body)
}

const api = {
  addUser,
}

export default api;
