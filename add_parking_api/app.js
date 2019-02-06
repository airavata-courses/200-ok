// load app server using express
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const shortUUId = require('short-uuid')



// Serving all files from the public directory, to test the api
app.use(express.static('./public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Use morgan to log server requests
app.use(morgan('short'))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// function to establish connection with the database, udpdate fields as required
function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: '200_ok'
  })
}

// Get a uinque user ID. Now now we return a 22 digit id using package 
// 'short-unique-id' : https://www.npmjs.com/package/short-uuid
// We can change this in future
function getUniqueID() {
  return shortUUId.generate()
}

function addNewGarage(params) {
  
}

function addNewParkingSpot(params) {
  
}

// get all user Garages for the given user
function getAllGarage(userId){
  const queryString = "Select * from parking_garage_detail where user_profile_id =?"

  var records = []


  const connection = getConnection()
  connection.query(queryString,[userId],(err,rows,fiels) => {

    if (err) {
      console.log("Failed to query for users: " + err)
    }
    else{
      console.log("Fetched list")

      for (let i = 0; i < rows.length; i++) {
        records.push({garageId:rows[i].parking_garage_id})
      }
    }
  })
  return records
}

// listen on port 3003
app.listen(3003,() => {
    console.log("Server is up and running on 3003...")
})

// Get Request

// Root route
app.get("/",(req,res) => {
    console.log("Responding to root route")
    res.send("Hello from ROOT")
})

// Get all garage for the user id
app.get("/get_all_garage/:id",(req,res) => {
  console.log("Fetching garages for user with id: " + req.params.id)

  // To Do:
  // later use promises to do this in getAllGarage()
  const userId = req.params.id
  const queryString = "Select * from parking_garage_detail where user_profile_id =?"
  var records = []
  const connection = getConnection()
  connection.query(queryString,[userId],(err,rows,fiels) => {

    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
    }
    else{
      console.log("Fetched list")

      for (let i = 0; i < rows.length; i++) {
        records.push({
          garageId: rows[i].parking_garage_id,
          numSpots: rows[i].num_of_spots
        })
      }
      res.json(records)
    }
  })
})

// Post Requests

// Add new parking
app.post("/add_parking",(req,res) => {
    console.log(" Adding new parking: "+req.params)

    // parse data from the post request 
    const garageId = getUniqueID()
    const userId = req.body.user_profile_id
    const address = req.body.address
    const city = req.body.city
    const pincode = req.body.pincode
    const numSpots = req.body.num_parking_spots
    const avail = "true"
    // insert into table
    const connection = getConnection()

    // ToDo:
    // Use promises to move this to a function and use utility classes for CRUD
    // Update table: creation_data_time to creation_date_time
    var queryString = "insert into parking_garage_detail \
    (user_profile_id,creation_data_time,last_mod_date_time,parking_garage_id,\
         address,city,pincode,num_of_spots) values (?,NOW(),NOW(),?,?,?,?,?)"
    connection.query(queryString,[userId,garageId,address,city,pincode,numSpots],(err,result,fields) => {
      if (err) {
        console.log("Failed to add parking garage: "+ err)
        res.sendStatus(500)
        return
      }
      else{
        console.log("Inserted new parking garage with id: " + result.insertId );
        var spotName = ""
        // Add different parking spots goiven by numSpots
        for (let i = 0; i < numSpots; i++) {
          spotName = "A"+i+1
          queryString = "insert into parking_spot_detail \
          (user_profile_id,creation_date_time,last_mod_date_time,date,parking_spot_name,\
            parking_garage_id,available) values (?,NOW(),NOW(),CURDATE(),?,?,?)"
          connection.query(queryString,[userId,spotName,garageId,avail],(err,result,fields) => {
            if (err) {
              console.log("Failed to add parking spot: "+ err)
              res.sendStatus(500)
            }
            else{
              console.log("Inserted new parking spot with id: " + result.insertId );
              console.log("value of i:"+i)
              // To Do:
              // Implement a better way to end
              if ( i == numSpots-1) {
                console.log("Ending response")
                res.json({success : "Updated Successfully", status : 200});
              }
            }
          })      
        }
      }
    })

    console.log("Finished adding")


})
