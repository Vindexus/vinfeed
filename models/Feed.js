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

FeedSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.accessKey1;
  delete obj.accessKey2;
  delete obj.consumerKey2;
  delete obj.consumerKey1;
  return obj;
}

module.exports = mongoose.model('Feed', FeedSchema);