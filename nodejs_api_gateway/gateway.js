// load app server using express
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
var request = require('request');

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

// listen on port 3005
app.listen(3005,() => {
    console.log("Server is up and running on 3005...")
})

// Get Request

// Root route
app.get("/",(req,res) => {
    console.log("Responding to root route")
    res.send("Hello from API Gateway")
})



// Post Requests

// Add new parking
app.post("/add_parking",(req,res) => {
    console.log("Adding new parking: ")
    console.log(JSON.stringify(req.body));

    var options = {
        uri: 'http://nodejs.service.consul:3003/add_parking',
        method: 'POST',
        json: JSON.parse(JSON.stringify(req.body))
    };

    request(options, function (error, response, body) {
        console.log("response "+ JSON.stringify(response))
        console.log("body:"+JSON.stringify(body))
        // Simply attach the respose got from the service
        res.json(response.body)
        res.end();
    });

    console.log("Finished adding")

})

// Check Availability
app.post("/checkAvailability",(req,res) => {
    console.log("Checking availability: ")
    console.log(JSON.stringify(req.body));

    var options = {
        uri: 'http://python.service.consul:5000/checkAvailability',
        method: 'POST',
        json: JSON.parse(JSON.stringify(req.body))
    };

    request(options, function (error, response, body) {
        console.log("response "+ JSON.stringify(response))
        console.log("body:"+JSON.stringify(body))
        // Simply attach the respose got from the service
        res.json(response.body)
        res.end();
    });

    console.log("Finished adding")
})

// Reserve spot
app.post("/reserveSpot",(req,res) => {
    console.log(" Reserving spot: ")
    console.log(JSON.stringify(req.body));

    var options = {
        uri: 'http://python.service.consul:5000/reserveSpot',
        method: 'POST',
        json: JSON.parse(JSON.stringify(req.body))
    };

    request(options, function (error, response, body) {
        console.log("response "+ JSON.stringify(response))
        console.log("body:"+JSON.stringify(body))
        // Simply attach the respose got from the service
        res.json(response.body)
        res.end();
    });

    console.log("Finished adding")
})


