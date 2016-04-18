var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Follower = require('../models/Follower.js');

router.get('/', function(req, res, next) {
  Follower.find(function (err, followers) {
    if (err) return next(err);
    res.json(followers);
  });
});

/* GET /todos listing. */
router.get('/:id', function(req, res, next) {
  Follower.findById(req.params.id, function (err, follower) {
    if (err) return next(err);
    res.json(follower);
  });
});

router.put('/:id', function(req, res, next) {
  Follower.findByIdAndUpdate(req.params.id, req.body, function(err,post) {
    if(err) {
      return next(err);
    }

    res.json(post)
  });
});

router.post('/', function(req, res, next) {
  Follower.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/all', function(req, res, next) {
  Follower.remove({}, function(err, post) {
    if(err) return next(err);
    res.json(post);
  });
})

router.delete('/:id', function(req, res, next) {
  Follower.findByIdAndRemove(req.params.id, function(err, post) {
    if(err) return next(err);
    res.json(post);
  });
})

module.exports = router;