var express = require('express'),
  app = express(),
  port = process.env.port || 4000;

var axios = require('axios');  
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const ghResponse = [];

app.get('/', (req, res, next) => {
  axios.all([
    axios.get('https://api.github.com/repositories?since=1000'),
    axios.get('https://api.github.com/repositories?since=1100')
  ]).then(axios.spread((response1, response2) => {
    let preParsedArr = response1.data;
    // console.log(response1.data[0]);
    // console.log(response2.data[0]);
    preParsedArr.forEach(obj => {
      let parsedObj = {
        repoid: obj.id,
        username: obj.owner.login,
        avatarurl: obj.owner.avatar_url,
        followers: obj.owner.followers_url,
      };
      ghResponse.push(parsedObj);
    })
    console.log(ghResponse[3]);
  })).catch(error => {
    console.log(error);
  })
});

app.get('/', (req, res, next) => {
    res.send(ghResponse);
})


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(port);
console.log(`Application listening on ${port}`);

module.exports = ghResponse;