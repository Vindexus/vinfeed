var mongoose = require('mongoose');

var FeedSchema = new mongoose.Schema({
  username: String,
  type: String,
  key1: String,
  key2: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feed', FeedSchema);