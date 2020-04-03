const fs = require('fs')

const routersList = fs.readdirSync('./routes')
  .filter((route) => route !== 'index.js')
  .map((filename) => ({
    rootUrl: `/${filename.replace('.js', '')}`,
    routers: require(`./${filename}`)
  }))

const getRouters = (routersList) =>
(app) => routersList.reduce((app, { rootUrl, routers }) => {
    app.use(rootUrl, routers)
    return app
  }, app)

module.exports = getRouters(routersList)
