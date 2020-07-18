const $roomInput = document.querySelector('#roomInput')
const $roomSelect = document.querySelector('#roomSelect')

$roomSelect.addEventListener('change', (e) => {
    const value = e.target.options[e.target.selectedIndex].textContent
    $roomInput.disabled = value === 'Select a room' ? false : true
})

$roomInput.addEventListener('change', (e) => {
    const value = e.target.value
    $roomSelect.disabled = !value ? false : true
})