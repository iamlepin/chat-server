export const trimValue = (value) => value && value.trim()

export const serialize = (data) => {
  try {
    return JSON.stringify(data)
  } catch (error) {
    console.error('body can\'t be stringified', error)
    return null
  }
}

export const storage = {
  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (error) {
      console.info(error)
      return null
    }
  },
  set: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.info(error)
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.info(error)
    }
  },
}

export const of = async (promise) => {
  const response = await promise.then(res => {
    const result = {}
    if (res && res.data) { result.data = res.data }
    if (res && res.message) { result.message = res.message }
    if (res && res.error) { result.error = res.error }
    return result
  })
  return response
}
