//User related routes
const express = require('express')
const mysql = require('mysql')
const route = express.Router()


// Create MySQL Connection
const pool = mysql.createPool({
    connectionLimit: 10,
    host:'localhost',
    user: 'root',
    // password: '',
    database: 'local_database'
})
function getConnection () {
    return pool
}

// Fetch all users from mysql database
route.get("/users", (req,res) => {

    const connection = getConnection()
  
    const queryString = "Select * from users"
    
    connection.query(queryString, (error, rows, fields) => {
      if(error) {
        console.log("Failed to fetch from users:" + error)
        res.sendStatus(500)
        res.end()
        return
      }
      console.log("Fetching user successful from MYQSL")
      res.json(rows)
    })
})
  
// Fetch users from mysql database using user id
route.get("/users/:id", (req, res) => {
    console.log("Fetching user for ID:" + req.params.id)
  
    const connection = getConnection()
  
    const userId = req.params.id
    const queryString = "Select * from users where id=?"
  
    connection.query(queryString, [userId], (error, rows, fields) => {
      if(error) {
        console.log("Failed to fetch from users:" + error)
        res.sendStatus(500)
        res.end()
        return
      }
      console.log("Fetching user successful from MYQSL")
      res.json(rows)
    })
  
})
  
// Create new user using html form
route.post("/create_user", (req, res) => {
    console.log("Trying to create new user")
  
    const firstName = req.body.first_name
    const lastName = req.body.last_name
  
    const connection = getConnection()
    const queryString = "Insert into users (first_name, last_name) values (?,?)"
    connection.query(queryString, [firstName, lastName], (error, results, fields) => {
  
      if(error) {
        console.log("Failed to insert into users:" + error)
        res.sendStatus(500)
        return
      }
      console.log("New user inserted successfully, ID: " + results.insertId)
      res.send("New user inserted successfully.")
  
    })
  
  })

  module.exports = route