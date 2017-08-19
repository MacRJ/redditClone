var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var cookies = require('cookies');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('newUser')
})

router.post('/new', function(req, res, next){
  if(req.body.password === req.body.confirm){
    bcrypt.hash(req.body.password, 8, function(err, hash){
      knex.raw(`INSERT INTO users (username, first_name, password, column5) VALUES ('${req.body.username}', '${req.body.first_name}', '${hash}', '${req.body.extra}')`)
      .then(function(data){
        knex.raw(`SELECT id FROM users where username = '${req.body.username}'`)
        .then(function(data){
          console.log(data.rows[0])
          res.cookie('User ID', data.rows[0])
          res.render('index')
        })
      })
    })
  } else {
    res.redirect('/')
  }
})

// login
router.post('/login', function(req,res,next){
  knex.raw(`SELECT * FROM users WHERE username = '${req.body.login}'`)
  .then(function(data){
    bcrypt.compare(req.body.password, data.rows[0].password, function(err, res2){
      if(res2 === true){
        res.cookie('name', data.rows[0].first_name)
        res.cookie('userID', data.rows[0].id)
        res.render('index', {Name: data.rows[0].first_name})
      } else {
        res.send("not logged in")
      }
    })
  })
})

// logOut
router.get('/logout', function(req,res,next){
  console.log("logout heard")
  res.clearCookie("name");
  res.clearCookie('userID');
  res.render('index')
})

module.exports = router;
