// index.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment')
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { unix } = require('moment');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const date = req.params.date;
  var unix;
  var utc;
  var newDate;

  // Check if there is a date param
  if (date) {
    // Case for string date
    if (moment(date, 'X').isValid() || moment(date, 'YYYY-MM-DD').isValid()) {
      
      
      // Case for normal date
      if (date.includes("-")) {
        newDate = new Date(date)
        utc = newDate.toUTCString()
        unix = Math.floor(newDate.getTime())
      } else {
        unix = Math.floor(date)
        newDate = new Date(unix)
        utc = newDate.toUTCString()
      }

      
    } else {
      // If not a valid date
      return res.json({"error":"Invalid Date"})
    }
    
  } else {
    now = new Date()
    unix = Math.floor(now.getTime() / 1000)
    utc = now.toUTCString()
  }
 
  return res.json({"unix":unix,"utc":utc})
})



// listen for requests :)
var listener = app.listen(8000, function () {
  console.log('Your app is listening on port ' + 8000);
});
