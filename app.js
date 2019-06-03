//jshint esversion: 6
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
var port = process.env.PORT || 3000;  // Setting up dynamic and static ports

app.use(express.static("public"));   // Creating a public folder to hold our CSS and images
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) { // GET
  res.sendFile(__dirname + "/signUp.html"); // Sending the main page (Sign Up)
});


app.post("/", function(req, res) { // POST

  var firstName = req.body.firstName;
  var secondName = req.body.secondName;
  var emailAddress = req.body.emailAddress;

  var data = { // Object with the data for the subscriber
    members: [{
        email_address: emailAddress,
        status: "subscribed",
        merge_fields: { // Merge fields for additional Info
          FNAME: firstName,
          LNAME: secondName
        }

      }

    ]
  };

  var jsonData = JSON.stringify(data); // Turning a real life JS object(data) to JSON flatpack

  var options = { // Creating object for the Request API
    url: "https://us20.api.mailchimp.com/3.0/lists/10dd517f57",
    method: "POST",
    headers: { // Authentication
      "Authorization": "ilknur1 163f41715735c982577b358cc415fc26-us20"
    },
  body: jsonData  // The body
  };

  request(options, function(error, response, body) { // Requesting API
    var statusCode = response.statusCode;

    if(statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

  });
});  // End of POST Method

app.post("/failure", function(req, res){   // Post method to redirect to the home page when there is an error
  res.redirect("/");
});

app.listen(port, function() {
  console.log("Server is running on port" + port);
});
//API KEY
//163f41715735c982577b358cc415fc26-us20
//list ID
//10dd517f57
