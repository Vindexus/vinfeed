var mongoose = require('mongoose');

var FeedSchema = new mongoose.Schema({
  username: String,
  type: String,
  accessKey1: String,
  accessKey2: String,
  consumerKey1: String,
  consumerKey2: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Feed', FeedSchema);