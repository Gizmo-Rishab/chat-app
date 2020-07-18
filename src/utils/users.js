const Filter = require('bad-words')
let users = []

const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim()
    room = room.trim().toUpperCase()
    
    const filter = new Filter()

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    } else if (filter.isProfane(username) || filter.isProfane(room)) {
        return {
            error: 'Username and room must not have profane words!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username.toUpperCase() === username.toUpperCase()
    })

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store User
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const removeAllUsers = () => {
    users = []
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    room = room.trim().toUpperCase()
    return users.filter((user) => user.room === room)
}

const getRooms = () => {
    let rooms = []
    users.forEach((user) => {
        if (!rooms.includes(user.room)) {
            rooms.push(user.room)
        }
    })
    return rooms
}

module.exports = {
    addUser,
    removeUser,
    removeAllUsers,
    getUser,
    getUsersInRoom,
    getRooms
}