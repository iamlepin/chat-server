export const trimValue = (value) => value && value.trim()

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