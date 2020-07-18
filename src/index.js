const { server } = require('./server')
const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`
    App is running on port ${port}...
    Press Ctrl+C to Shutdown
    `)
})