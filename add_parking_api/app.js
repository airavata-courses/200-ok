// load app server using express
const express = require('express')
const app = express()

// listen on port 3003
app.listen(3003,() => {
    console.log("Server is up and running on 3003...")
})

// Adding root route
app.get("/",(req,res) => {
    console.log("Responding to root route")
    res.send("Hey ROOT")
})