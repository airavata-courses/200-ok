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
    console.log(" Adding new parking: "+req.params)

    console.log(JSON.stringify(req.body));

    var options = {
        uri: 'http://nodejs.service.consul:3003/add_parking',
        method: 'POST',
        json: JSON.parse(JSON.stringify(req.body))
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body.id) // Print the shortened url.
          res.json({success : "Updated Successfully", status : 200});
          res.end;
        }
        else{
            res.json({success : "Updated Successfully", status : 500});
            res.end;
        }
    });

    console.log("Finished adding")
})
