var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Follower = require('../models/Follower.js');
var config = require('../config/config.js');

router.get('/', function(req, res, next) {
  var limit = req.query.hasOwnProperty("limit") ? req.query.limit : 20;
  var skip = req.query.hasOwnProperty("skip") ? req.query.skip : 0;
  var sort = {_id: -1};
  var where = {};
  var page = req.query.hasOwnProperty("page") ? req.query.page : 1;

  if(req.query.hasOwnProperty("orderBy")) {
    sort[req.query.orderBy] = req.query.hasOwnProperty("desc") ? (req.query.desc == true ? -1 : 1) : 1;
  }

  if(req.query.hasOwnProperty("page")) {
    skip = (page - 1) * limit;
  }
  //console.log("req", req);

  if(req.query.hasOwnProperty("type")) {
    where.type = req.query.type;
  }

  if(req.query.hasOwnProperty("after")) {
    where['_id'] = {$gt: req.query.after};
  }

  Follower.find(where, function (err, followers) {
    if (err) return next(err);
    res.format( {
      json: function () {
        res.json(followers); 
      },
      html: function () {
        res.render('followers/index', {title: "Followers Page " + page, config: config, followers: followers});
      }
    });
  }).limit(limit).sort(sort).skip(skip);
});

/* GET /todos listing. */
router.get('/:id', function(req, res, next) {
  Follower.findById(req.params.id, function (err, follow) {
    if (err) return next(err);
    res.format( {
      json: function () {
        res.json(follow);
      },
      html: function () {
        res.render('followers/edit', {follow: follow, title: 'Edit Follow'});
      }
    });
  });
});

router.post('/:id', function(req, res, next) {
  Follower.findByIdAndUpdate(req.params.id, req.body, function(err,post) {
    if(err) {
      return next(err);
    }

    res.format( {
      json: function () {
        res.json(post);
      },
      html: function () {
        res.redirect('/followers/' + req.params.id);
      }
    });
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