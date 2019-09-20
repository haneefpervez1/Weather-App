const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    e.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
            return console.log(data.error)
        }
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecastData
        console.log(data)
        })
    })
})