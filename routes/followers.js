var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Follower = require('../models/Follower.js');

router.get('/', function(req, res, next) {
  var limit = req.query.hasOwnProperty("limit") ? req.query.limit : 5;
  var skip = req.query.hasOwnProperty("skip") ? req.query.skip : 0;
  var sort = req.query.hasOwnProperty("sort") ? req.sort : {_id: -1};
  var where = {}; 

  if(req.query.hasOwnProperty("type")) {
    where.type = req.query.type;
  }

  if(req.query.hasOwnProperty("after")) {
    where['_id'] = {$gt: req.query.after};
  }

  Follower.find(where, function (err, followers) {
    if (err) return next(err);
    res.json(followers);
  }).limit(limit).sort(sort).skip(skip);
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