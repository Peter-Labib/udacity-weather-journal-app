const projectData = {}

/* Express to run server and routes */
const express = require('express')

/* Start up an instance of app */
const app = express()

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* Cors for cross origin allowance */
const cors = require('cors')
app.use(cors())

/* Initialize the main project folder */
app.use(express.static('website'))

/* Sign up the server */
const port = 3000
app.listen(port, listner)

/* Callback to debug */
function listner () {
  console.log(`running on localhost:${port}`)
}

/* POST route */
app.post('/weatherData', weatherDataHandler)

function weatherDataHandler (req, res) {
  projectData.date = req.body.currentlyDate
  projectData.temp = req.body.temp
  projectData.feeling = req.body.feeling
  console.log(projectData)
}

/* GET route, send all data to client */
app.get('/all', sendData)

function sendData (req, res) {
  res.send(projectData)
}
