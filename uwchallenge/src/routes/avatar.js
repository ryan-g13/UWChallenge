var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET avatars from the github api */
let ghResponse = [];
router.get('/', (req, res, next) => {
  axios.get('http://localhost:4000/').then(response => { 
    ghResponse = response;
    console.log(ghResponse) });
});
