var mongoose = require('mongoose');

var FeedSchema = new mongoose.Schema({
  username: String,
  type: String
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