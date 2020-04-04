const schemas = Object.create(null)

schemas.add = {
  type: 'object',
  required: [ 'name', 'email', 'password' ],
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    fb_id: { type: 'string' },
    user_pic: { type: 'string' },
  }
}

module.exports = schemas
