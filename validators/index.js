const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })
const schemas = Object.create(null)

schemas.users = require('./schemas/users')

for (const module in schemas) {
  Object.keys(schemas[module]).map((schema) => {
    schemas[module][schema] = ajv.compile(schemas[module][schema])
  })
}

module.exports = schemas
