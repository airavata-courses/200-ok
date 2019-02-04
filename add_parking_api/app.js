// load app server using express
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

// Serving all files from the public directory, to test the api
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: true}))

// Use morgan to log server requests
app.use(morgan('short'))

// function to establish connection with the database, udpdate fields as required
function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: '200_ok'
  });
  
}

// listen on port 3003
app.listen(3003,() => {
    console.log("Server is up and running on 3003...")
})

// Get Request

// Adding GET root route
app.get("/",(req,res) => {
    console.log("Responding to root route")
    res.send("Hey ROOT")
})


// Post Requests

// Add new parking
app.post("/add_parking",(req,res) => {
    console.log(" Adding new parking: "+req.params)
  
    // parse data from the post request
    const id = 1
    const garageId = 1
    const userId = req.body.user_profile_id
    const address = req.body.address
    const city = req.body.city
    const pincode = req.body.pincode
  
    // insert into table
    const connection = getConnection()
    const queryString = "insert into parking_garage_detail \
    (id,user_profile_id,creation_data_time,last_mod_date_time,parking_garage_id,\
         address,city,pincode) values (?,?,NOW(),NOW(),?,?,?,?)"
    connection.query(queryString,[id,userId,garageId,address,city,pincode],(err,result,fields) => {
      if (err) {
        console.log("Failed to add parking: "+ err)
        res.sendStatus(500)
        return      
      }
      else{
        console.log("Inserted new parking with id: " + result.insertId );
      }
    })
  
    res.end()
})