//User related routes
const express = require('express')
const mysql = require('mysql')
const Joi = require('joi')
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

// Validate Usernames
function validateUser(user) {
  const schema = {
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required()
  }
  return Joi.validate(user, schema)
}

/*GET Method */
/*Read*/

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

/*POST Method */
/*Create*/

// Create new user using html form
route.post("/create_user", (req, res) => {
    console.log("Trying to create new user")
  
    const firstName = req.body.first_name
    const lastName = req.body.last_name
  
    const {error} = validateUser(req.body)
    if(error) return res.status(400).send(result.error.details[0].message)

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

/*PUT Method */
/*Update*/

// Update user using postman: Method: PUT, body->raw->JSON {"first_name": "Raju","last_name": "Mridha","id": 1}
route.put("/update_user", (req, res) => {

  console.log("Update user of ID:" + req.body.id + req.body.first_name + req.body.last_name)

  const connection = getConnection()
  const queryString = "Update users SET first_name = ?, last_name = ? WHERE id = ?"
  connection.query(queryString, [req.body.first_name,req.body.last_name, req.body.id], (error, results, fields) => {

    if(error) {
      console.log("Failed to update into users:" + error)
      res.sendStatus(500)
      return
    }
    console.log("User updated successfully, ID: " + req.body.id)
    res.send("User updated successfully.")

  })

})

/*DELETE Method */
/*Delete*/

// Delete user using postman like : http://localhost:3003/delete_user/1 (1 is the "user_id")
route.delete("/delete_user/:id", (req, res) => {

  console.log("Deleting user of ID:" + req.params.id)

  const connection = getConnection()

  const userId = req.params.id
  const queryString = "DELETE FROM users WHERE id=?"

  connection.query(queryString, [userId], (error, rows, fields) => {
    if(error) {
      console.log("Failed to delete user:" + error)
      res.sendStatus(500)
      res.end()
      return
    }
    console.log("Delete user successful from MYQSL")
    res.send("Delete user successful.")
  })
})

module.exports = route