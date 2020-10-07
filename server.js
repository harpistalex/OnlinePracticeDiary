const express = require('express')
// to access the JS in the controller module
const controller = require('./controller/controllerMain')
const logger = require('morgan')

const admin = require("firebase-admin")
const serviceAccount = require("./onlinepracticediary-firebase-adminsdk-1u3gq-8c1262c3dc.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://onlinepracticediary.firebaseio.com"
})


const app = express()

// set up template engine
app.set('view engine', 'ejs')

// static files
app.use(express.static('views'))
app.set('views', __dirname + '/views')

// set up morgan
app.use(logger('dev'))

// fire controllers (so we can use this app.js file in the controller file)
controller(app)

// listen to port
const port = 3000
app.listen(port);
console.log('You are listening to port ' + port)