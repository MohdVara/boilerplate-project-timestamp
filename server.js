/*jshint esversion: 6 */
// server.js
process.env.PORT = 3000;

var express = require('express');
var app = express();

// GET endpoint for just /api/timestamp
/*
*   Response example : 
    {
      "unix": < Current unix timestamp >,
      "utc": <Current utc timestamp >
    }
*/
app.get("/api/timestamp", function (req, res) {
  resultDate = new Date();
  res.json({
    unix: resultDate.getTime(), 
    utc: resultDate.toUTCString()
  });
});

//GET end for /api/timestamp/<date compliant with ISO-8601 OR unix timestamp>
/*
*   Response example : 
    {
      "unix": 1479663089000 ,
      "utc": "Sun, 20 Nov 2016 17:31:29 GMT"
    }
*/
app.get("/api/timestamp/:date_string", function (req, res) {
  let regexUnix = /^\d{10}$/; // Regex to check if it complies with short unix timestamp
  let date_string = req.params.date_string;
  let resultDate;
  if(regexUnix.test(date_string)){ // Check if it matches shortform unix timestamp
    resultDate = new Date(parseInt(date_string)*1000); //Convert to longform unix timestamp
  }else{
    resultDate = new Date(date_string); 
    //Take string and return date if valid else return null and invalid date.
  }

  res.json({
    unix: resultDate.getTime(), 
    utc: resultDate.toUTCString()
  });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});