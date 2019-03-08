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


// Post on API but GET on the service
// Get all garages for a user
app.post("/get_all_garage",(req,res) => {
  console.log("Fetching garages for user with id: " + req.body.user_profile_id)

  var options = {
    uri: 'http://nodejs.service.consul:3003/get_all_garage/'+req.body.user_profile_id,
    method: 'GET'
};

request(options, function (error, response, body) {
    if (!error && response != null) {
        console.log("response "+ JSON.stringify(response))
        console.log("body:"+JSON.stringify(body))
        // Simply attach the respose got from the service
        res.json(JSON.parse(body)) 
    }        
});
console.log("Finished get_all_garage")
res.end();
})

// Get all garages
app.post("/getAllGarages",(req,res) => {
    console.log("Fetching garages")
  
    var options = {
      uri: 'http://java.service.consul:8090/api/getAllGarages',
      method: 'GET'
  };
  
  request(options, function (error, response, body) {
      if (!error && response != null) {
          console.log("response "+ JSON.stringify(response))
          console.log("body:"+JSON.stringify(body))
          // Simply attach the respose got from the service
          res.json(JSON.parse(body)) 
      }        
    });
    console.log("Finished getAllGarages")
    res.end();
  })

  // Register User
app.post("/register",(req,res) => {
    console.log("Registering User")
  
    var tempUrl = 'http://java.service.consul:8090/api/register?'
    tempUrl += '&firstname='+ req.body.firstname
    tempUrl += '&lastname='+ req.body.lastname
    tempUrl += '&username='+ req.body.username
    tempUrl += '&password='+ req.body.password

    var options = {
      uri: tempUrl,
      method: 'GET'
  };
  
  request(options, function (error, response, body) {
      if (!error && response != null) {
        console.log(JSON.stringify(response));
        if (response.statusCode == 200) {
          res.json(JSON.parse(body));
        }
        else{
            res.sendStatus(500);
        }
      }        
    });
    console.log("Finished register")
    res.end();
  })

  // Login User
app.post("/login",(req,res) => {
    console.log("Logging in User")

    var tempUrl = 'http://java.service.consul:8090/api/login?'
    tempUrl += '&username='+ req.body.username
    tempUrl += '&password='+ req.body.password
  
    var options = {
      uri: tempUrl,
      method: 'GET'
  };
  
  request(options, function (error, response, body) {
      if (!error && response != null) {
          console.log(JSON.stringify(response));
          if (response.statusCode == 200) {
            res.json(JSON.parse(body));
          }
          else{
              res.sendStatus(500);
          }
      }        
      res.end();
  });
  console.log("Finished login")
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
        if (!error && response != null) {
            console.log("response "+ JSON.stringify(response))
            console.log("body:"+JSON.stringify(body))
            // Simply attach the respose got from the service
            res.json(response.body)
        }
    });

    console.log("Finished add_parking")
    res.end();

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
        if (!error && response != null) {
            console.log("response "+ JSON.stringify(response))
            console.log("body:"+JSON.stringify(body))
            // Simply attach the respose got from the service
            res.json(response.body)
        }
        
    });
    
    console.log("Finished checkAvailability")
    res.end();
})

// Reserve spot
app.post("/reserveSpot",(req,res) => {
    console.log("Reserving spot: ")
    console.log(JSON.stringify(req.body));

    var options = {
        uri: 'http://python.service.consul:5000/reserveSpot',
        method: 'POST',
        json: JSON.parse(JSON.stringify(req.body))
    };

    request(options, function (error, response, body) {
        if (!error && response != null) {
            console.log("response "+ JSON.stringify(response))
            console.log("body:"+JSON.stringify(body))
            // Simply attach the respose got from the service
            res.json(response.body)
        }
    });
    
    console.log("Finished reserveSpot")
    res.end();
})


