// Importing with ES5 for express server since es6 not supported. 
var express = require('express'),
  app = express(),
  port = process.env.port || 4000;

var axios = require('axios');  
var bodyParser = require('body-parser');
var cors = require('cors');

// Middleware necessary for front end to talk to backend
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// +++++++++++++++++++++++++++++++++++++++++++++++++
// Defining Github route for fetch via promises since retrieving multiple api endpoints
// +++++++++++++++++++++++++++++++++++++++++++++++++
const ghResponse = [];
let apiStart = 1000;

app.get('/', (req, res, next) => {
  axios.all([
    axios.get(`https://api.github.com/repositories?since=${apiStart}`),
    axios.get(`https://api.github.com/repositories?since=${apiStart + 100}`),
    axios.get(`https://api.github.com/repositories?since=${apiStart + 200}`),
    axios.get(`https://api.github.com/repositories?since=${apiStart + 300}`)
  ]).then(axios.spread((response1, response2, response3, response4) => {
    // let preParsedArr = response1.data;
    let preParsedArr = [response1.data, response2.data, response3.data, response4.data];

    preParsedArr.forEach(array => {
      array.forEach(obj => {
        let parsedObj = {
          repoid: obj.id,
          username: obj.owner.login,
          avatarurl: obj.owner.avatar_url,
          followers: obj.owner.followers_url,
        };
        ghResponse.push(parsedObj);
      })
    })
    console.log(ghResponse.length)
    console.log('API Fulfilled available for pull');
    res.send( ghResponse);
  })).catch(error => {
    console.log(error);
  })
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(port);
console.log(`Application listening on ${port}`);

module.exports = ghResponse;