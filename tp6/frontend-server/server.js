// Import modules
const http = require('http')
const router = require('./router.js')

// Import handler modules
const { handleStaticResource } = require('./static-resources.js')
const { getMainPage } = require('./main-page.js')
const { getTasks, createTask, updateTask, deleteTask } = require('./tasks.js')

// Register routes
router.registerRoute(/public\/[\w/]*\.[css|js|ico]/, 'GET', handleStaticResource)
router.registerRoute('/', 'GET', getMainPage)
router.registerRoute('/tasks', 'GET', getTasks)
router.registerRoute('/tasks', 'POST', createTask)
router.registerRoute(/\/tasks\/[0-9]+$/, 'PUT', updateTask)
router.registerRoute(/\/tasks\/[0-9]+$/, 'DELETE', deleteTask)

// Initialize server
console.log('Server listening on port 4000')
const server = http.createServer(router.handleIncomingRequest)
server.listen(4000)
