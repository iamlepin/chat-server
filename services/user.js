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


    const existsName = await this.findBy({ name })
    const existsEmail = await this.findBy({ email })
    if (existsName || existsEmail) {
      return {
        success: false,
        isExistsName: Boolean(existsName),
        isExistsEmail: Boolean(existsEmail),
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

  async findBy (searchObject) {
    const foundUsers = await this.models.user.findBy(searchObject)
    return foundUsers
  }

  async checkBy (searchObject) {
    const foundUser = await this.findBy(searchObject)
    return {
      isExists: Boolean(foundUser.length),
    }
  }
}

module.exports = User
