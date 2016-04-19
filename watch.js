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

mongoose.connect(config.mongodbUrl, function(err) {
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
  var client = new Twitter({
    consumer_key: f.consumerKey1,
    consumer_secret: f.consumerKey2,
    access_token_key: f.accessKey1,
    access_token_secret: f.accessKey2
  });
   
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
    for(var i in res.follows) {
      console.log(res.follows[i].user.display_name + " followed " + f.username + " on " + f.type);
      Follower.create({follower: res.follows[i].user.display_name, following: f.username, type: f.type});
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
