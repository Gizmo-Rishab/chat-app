class User {
    constructor(id, username, room) {
        this.id = id
        this.username = username
        this.room = room
    }
}

const user1 = new User(1, '  Rishab  ', ' Minecrafters  ') // Added
const user2 = new User(2, ' ', '  ') // Not Added
const user3 = new User(3, ' Hell DragonXXX', ' Hell  ') // Not Added
const user4 = new User(4, ' Cool', '   Cool Bois ') // Added by beforeAll() but removed later
const user5 = new User(5, 'Chromnite', 'Minecrafters') // Added by beforeAll()
const user6 = new User(6, 'Lorem Ispum', 'Default text') // Added by beforeAll()
const user7 = new User(7, 'Hello World', 'Default text') // Added by beforeAll()

const cleanObject = (request) => {
    let response = []

    request.forEach(element => {
        element.username = element.username.trim()
        element.room = element.room.trim().toUpperCase()
        response.push(element)
    })

    response.sort((a, b) => {
        if (a.username.toUpperCase() < b.username.toUpperCase()) {
            return -1
        } else if (a.username.toUpperCase() > b.username.toUpperCase()) {
            return 1
        } else {
            return 0
        }
    })

    return response
}

module.exports = {
    user1,
    user2,
    user3,
    user4,
    user5,
    user6,
    user7,
    cleanObject
}