const io = require('socket.io-client')
const { io: ioServer, server } = require('../src/server')

let socket
const httpServerAddr = server.listen().address()

afterAll((done) => {
    ioServer.close()
    server.close()
    done()
})

beforeEach((done) => {
    socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
        'reconnection delay': 0,
        'reopen delay': 0,
        'force new connection': true,
        transports: ['websocket'],
    })
    socket.on('connect', () => {
        done()
    })
})

afterEach((done) => {
    if (socket.connected) {
        socket.disconnect()
    }
    done()
})

describe('basic socket.io example', () => {
    test('should communicate', (done) => {
        ioServer.emit('echo', 'Hello World')
        socket.once('echo', (message) => {
            expect(message).toBe('Hello World')
            done()
        })
        ioServer.on('connection', (mySocket) => {
            expect(mySocket).toBeDefined()
        })
    })

    test('should communicate with waiting for socket.io handshakes', (done) => {
        socket.emit('example', 'some messages')
        setTimeout(() => {
            done()
        }, 50)
    })
})