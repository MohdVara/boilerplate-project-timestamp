/*jshint esversion: 6 */
// server.js
process.env.PORT = 3000;

var express = require('express');
var app = express();

app.get("/api/timestamp", function (req, res) {
  resultDate = new Date();
  res.json({
    unix: resultDate.getTime(), 
    utc: resultDate.toUTCString()
  });
});

app.get("/api/timestamp/:date_string", function (req, res) {
  let regexUnix = /^\d{10}$/;
  let date_string = req.params.date_string;
  let resultDate;
  if(regexUnix.test(date_string)){
    resultDate = new Date(parseInt(date_string)*1000); 
  }else{
    resultDate = new Date(date_string);
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