const { generateMessage, generateLocationMessage } = require('../src/utils/messages')

test('Generate message', () => {
    const msgObj = generateMessage('Rishab', 'Hi!')
    expect(msgObj).toMatchObject({
        username: 'Rishab',
        text: 'Hi!'
    })
})

test('Generate location message', () => {
    const msgObj = generateLocationMessage('Rishab', 'https://www.google.com')
    expect(msgObj).toMatchObject({
        username: 'Rishab',
        url: 'https://www.google.com'
    })
})