var mongoose = require('mongoose');

var FollowerSchema = new mongoose.Schema({
  follower: String,
  following: String,
  type: String
}, {
  timestamps: true
});

FollowerSchema.index({follower: 1, type: 1, following: 1}, {unique: true});

module.exports = mongoose.model('Follower', FollowerSchema);