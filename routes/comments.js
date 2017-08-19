var express = require('express');
var router = express.Router();
var cookies = require('cookies');
var knex = require('../db/knex');

// adding comments to database

router.post('/', function(req, res, next) {
  var userName = req.cookies.Name
  var userID = req.cookies.UserID
  console.log(userID)
  console.log(req.body.commentField)
  knex.raw(`INSERT INTO comments(user_id, post) VALUES('${req.cookies.UserID}', '${req.body.commentField}');`)
    .then(function(data) {}).catch(function(err) {
      res.send(err)
    })
})

module.exports = router;
