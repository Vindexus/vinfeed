var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Follower = require('../models/Follower.js');
var config = require('../config/config.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Followers', config: config});
});

module.exports = router;
