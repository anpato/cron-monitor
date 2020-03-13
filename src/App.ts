import Server from './Server'
import middleware from './middleware/dependencies'
import { PORT } from './env'


const App = new Server(PORT, middleware, '/')
App.initialize()
