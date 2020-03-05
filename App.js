const Server = require('./Server')
const middleWare = require('./middleware/dependencies')
const { PORT } = require('./env')

const App = new Server(PORT, middleWare, '/')
App.initialize()
