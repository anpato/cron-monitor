module.exports = class Server {
  constructor(port, middleWare, baseroute) {
    this.app = require('express')()
    this.port = port
    this.middleWare = middleWare
    this.baseroute = baseroute
  }

  listen() {
    this.app.listen(this.port, () => {
      console.info(`Server Started on port: ${this.port}`)
    })
  }

  init_middleWare() {
    this.middleWare.forEach(middleware => this.app.use(middleware))
  }

  init_routes() {
    this.app.use('/api', require('./routes/AppRouter'))
  }

  initialize() {
    this.app.disable('x-powered-by')
    this.init_middleWare()
    this.init_routes()
    this.listen()
  }
}
