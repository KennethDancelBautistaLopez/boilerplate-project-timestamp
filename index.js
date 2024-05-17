// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { is } = require('express/lib/request');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let date = req.params.date;
  let unixDate;
  let dateObj;
  let utcDate;

  let isUnix = /^\d+$/.test(date);

  if (isUnix){
    unixDate = parseInt(date);
    dateObj = new Date(unixDate)
    utcDate = dateObj.toUTCString();
  } else if(!isUnix) {
    dateObj = new Date(date);
    unixDate = dateObj.getTime();
    utcDate = dateObj.toUTCString();
  }

  res.json({unix: unixDate, utc: utcDate});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
