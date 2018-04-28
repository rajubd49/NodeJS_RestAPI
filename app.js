// NodeJS RestAPI
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyparser = require('body-parser')

//Log request details on terminal
app.use(morgan('short'))

//Load form.html from public directory
app.use(express.static('./public'))

// Using bodyparser to access html fields
app.use(bodyparser.urlencoded({extended: false}))

// Localhost port define - localhost:3003
app.listen(3003, ()=> {
  console.log("NodeJS RestAPI Server is Up and Running using port 3003");
})

//Root route set
app.get("/", (req, res) => {
  console.log("Root route setup successful")
  res.send("Hello from ROOT")

})

const route = require('./routes/user.js')
app.use(route)





