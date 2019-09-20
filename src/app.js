const path = require('path')
const express =  require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Haneef Pervez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ',
        name: 'Haneef Pervez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message.',
        title: 'Help',
        name: 'Haneef Pervez'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            } 
            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('errorpage', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Haneef Pervez'
    })
})

app.get('*', (req, res) => {
    res.render('errorpage', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Haneef Pervez'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})