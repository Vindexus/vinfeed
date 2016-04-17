var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Follower = require('../models/Follower.js');
var config = require('../config/config.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var followers = Follower.find(function(err, followers) {
    res.render('index', { title: 'Followers', followers: followers });
  }).skip(config.followsInitialBuffer).limit(config.followsNumDisplay);
});

module.exports = router;
