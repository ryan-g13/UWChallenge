var express = require('express'),
  app = express(),
  port = process.env.port || 4000;

var axios = require('axios');  
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const ghResponse = [];

app.get('/', (req, res, next) => {
  axios.all([
    axios.get('https://api.github.com/repositories?since=1000'),
    axios.get('https://api.github.com/repositories?since=1100'),
    axios.get('https://api.github.com/repositories?since=1200')
  ]).then(axios.spread((response1, response2, response3) => {
    // let preParsedArr = response1.data;
    let preParsedArr = [response1.data, response2.data, response3.data];

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