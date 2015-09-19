
var express = require("express");

// var path = require("path");
var bodyParser = require('body-parser');

// var restify = require('restify');

var app = express();

app.use(bodyParser.json());   

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(restify.CORS());

// Express CORS middleware.. so much easier than trying to get Restify to work

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');
 
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain);   // make sure this is is called before the router
// app.use(app.router);   
app.use(require("./userRepo"));

app.disable('etag');

//allow cross-domain scripting (Access-Control-Allow-Origin: *).
// app.all('/', function (req, res) {
//    	res.header("Access-Control-Allow-Origin", "*");
//   	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// });

app.listen(8080, function(){
	console.log("ready on port 8080... ");
});