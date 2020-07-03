const bcrypt = require('bcrypt')
const regexp = require('../api/constants/regexp')

class User {
  constructor (models) {
    this.models = models
  }

  static init (models) {
    return new User(models)
  }

  async add ({ name, email, password }) {
    const isValidName = regexp.USER_NAME.test(name)
    if (!isValidName) {
      return {
        success: false,
        message: 'Name does not match criteria'
      }
    }
    const isValidEmail = regexp.EMAIL.test(email)
    if (!isValidEmail) {
      return {
        success: false,
        message: 'Email does not match criteria'
      }
    }
    const isValidPassword = regexp.PASSWORD.test(password)
    if (!isValidPassword) {
      return {
        success: false,
        message: 'Password does not match criteria'
      }
    }


    const isExistsName = await this.checkBy({ name })
    const isExistsEmail = await this.checkBy({ email })
    if (isExistsName || isExistsEmail) {
      return {
        success: false,
        isExistsName: Boolean(isExistsName),
        isExistsEmail: Boolean(isExistsEmail),
      }
    }

    const hash = await bcrypt.hash(password, 10)

    const newUserData = await this.models.user.add({
      name,
      email,
      password: hash,
    })
    return {
      success: true,
      id: newUserData.id,
    }
  }

  async checkBy (searchObject) {
    const foundUsers = await this.models.user.checkBy(searchObject)
    return foundUsers
  }
}

module.exports = User
