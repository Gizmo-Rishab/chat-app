const { addUser, removeUser, removeAllUsers, getUser, getUsersInRoom, getRooms } = require('../src/utils/users')
const { user1, user2, user3, user4, user5, user6, user7, cleanObject } = require('./fixtures/db')

beforeAll((done) => {
    removeAllUsers()
    addUser(user4)
    addUser(user5)
    addUser(user6)
    addUser(user7)

    done()
})

describe('User Manipulation', () => {
    describe('adding a user', () => {
        test('works', () => {
            const response = addUser(user1)
            expect(response.user).toMatchObject({
                id: 1,
                username: 'Rishab',
                room: 'MINECRAFTERS'
            })
        })

        describe('fails due to', () => {
            test('falsy values for username and room', () => {
                const response = addUser(user2)
                expect(response).toMatchObject({
                    error: 'Username and room are required!'
                })
            })

            test('profane username and/or room', () => {
                const response = addUser(user3)
                expect(response).toMatchObject({
                    error: 'Username and room must not have profane words!'
                })
            })

            test('username taken', () => {
                const response = addUser(user4)
                expect(response).toMatchObject({
                    error: 'Username is in use!'
                })
            })
        })
    })

    describe('removing a user', () => {
        test('works', () => {
            const response = removeUser(user4.id)
            expect(response).toMatchObject({
                id: 4,
                username: 'Cool',
                room: 'COOL BOIS'
            })
        })

        test('fails', () => {
            const response = removeUser(user2.id) // user2 is not there
            expect(response).toBeFalsy()
        })
    })

    describe('fetching user data', () => {
        test('works', () => {
            const response = getUser(user5.id)
            expect(response).toMatchObject({
                id: 5,
                username: 'Chromnite',
                room: 'MINECRAFTERS'
            })
        })

        test('fails', () => {
            const response = removeUser(user2.id) // user2 is not there
            expect(response).toBeFalsy()
        })
    })
})

describe('Room Manipulation', () => {
    test('fetching room names', () => {
        const response = getRooms()
        expect(response).toMatchObject(['MINECRAFTERS', 'DEFAULT TEXT'])
    })

    test('fetching users in a room', () => {
        const response = getUsersInRoom('minecrafters')
        expect(response).toMatchObject(cleanObject([user1, user5]))
    })
})