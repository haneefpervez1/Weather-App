const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/73913e66713fb8f62149140eb72a5fb4/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            currentWeather = body.currently
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + currentWeather.temperature 
            + ' degrees out. There is a ' + currentWeather.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast