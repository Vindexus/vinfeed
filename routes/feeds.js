var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Feed = require('../models/Feed.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Feed.find(function (err, feeds) {
    if (err) return next(err);
    res.format( {
      json: function () {
        res.json(feeds); 
      },
      html: function () {
        res.render('feeds/index', {title: "Feeds", feeds: feeds});
      }
    });
  });
});

/* GET /todos listing. */
router.get('/:id', function(req, res, next) {
  Feed.findById(req.params.id, function (err, feed) {
    if (err) return next(err);
    res.json(feed);
  });
});

router.put('/:id', function(req, res, next) {
  Feed.findByIdAndUpdate(req.params.id, req.body, function(err,post) {
    if(err) {
      return next(err);
    }

    res.json(post)
  });
});

router.post('/', function(req, res, next) {
  Feed.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  Feed.findByIdAndRemove(req.params.id, function(err, post) {
    if(err) return next(err);
    res.json(post);
  });
})

module.exports = router;