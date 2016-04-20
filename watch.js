var express = require('express');
var logger = require('morgan');

var app = express();

var mongoose = require('mongoose');
var Twitter = require('twitter');
var TwitchApi = require('twitch-api');
var config = require('./config/config.js');
var Feed = require('./models/Feed.js');
var Follower = require('./models/Follower.js');
var twitch = new TwitchApi({});
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

mongoose.connect(process.env.MONGODB_URI, function (err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


function findTwitter(f) {
  var params = {screen_name: f.username, skip_status: true, count: 100};
  client.get('followers/list', params, function(error, followers, response){
    if (!error) {
      for(var k in followers.users) {
        console.log(followers.users[k].screen_name + " followed " + f.username + " on " + f.type)
      Follower.create({follower: followers.users[k].screen_name, following: f.username, type: f.type});
      }
    }
  });        
}

function findTwitch(f) {
  twitch.getChannelFollows(f.username, function(err, res) {
    if(err) {
      console.log("err", err);
    }
    else {
      for(var i in res.follows) {
        console.log(res.follows[i].user.display_name + " followed " + f.username + " on " + f.type);
        Follower.create({follower: res.follows[i].user.display_name, following: f.username, type: f.type});
      } 
    }
  });
}

Feed.find(function(err, feeds) {
  var timeout;
  function checkFeeds() {
    for(var i in feeds) {
      var f = feeds[i];
      if(f.type == 'twitter') {
        findTwitter(f);
      }
      else if(f.type == 'twitch') {
        findTwitch(f);
      }
    }

    timeout = setTimeout(checkFeeds, config.feedCheckInterval);
  }

  checkFeeds();
});

module.exports = app;
