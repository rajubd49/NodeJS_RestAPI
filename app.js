// NodeJS RestAPI
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyparser = require('body-parser')

//Log request details on terminal
app.use(morgan('dev'))

//Load form.html from public directory
app.use(express.static('./public'))

// Using to support JSON-encoded bodies
app.use(bodyparser.json());

// Using bodyparser to access html fields
app.use(bodyparser.urlencoded({extended: false}))

// Localhost port define - localhost:PORT
const PORT = process.env.PORT || 3003
app.listen(PORT, ()=> {
  console.log("NodeJS RestAPI Server is Up and Running using port:" + PORT);
})

//Root route set
app.get("/", (req, res) => {
  console.log("Root route setup successful")
  res.send("Hello from ROOT")

})

const route = require('./routes/user.js')
app.use(route)

