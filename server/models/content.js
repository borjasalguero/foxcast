var mongoose = require('mongoose');
var dongleManger = require('../models/dongle.js');
var Schema = mongoose.Schema;

// Define the schema of a single Item. Every "Item" must
// belongs to, at least, one Collection.
var ContentSchema = new Schema({
  url: String,
  dongle_id: String,
  action:  { type: String, default: 'open' }, // Could be 'open' or 'watch'
  executed: { type: Boolean, default: false },
  created: { type: Date, default: Date.now() }
});

var ContentModel = mongoose.model('Content', ContentSchema);

var ContentManager = {
  // Create a content for a specific dongle
  // We need the dongle ID, the URL to open/watch
  create: function(req, res) {
    console.log('Lets store the item ' + JSON.stringify(req.body));
    var content = new ContentModel(req.body);
    content.save(function(e, contentCreated) {
      if (e) {
        return res.send(500, e.message);
      }
      dongleManger.notify(contentCreated.dongle_id, function(e) {
        if (e) {
          return res.send(500, e.message);
        }
        res.status(200).jsonp(contentCreated);
      });

    });
  },
  // Given a version from the push notification, we get
  // all content non-executed yet in the TV
  get: function(req, res) {
    ContentModel.find(
      {
        dongle_id: req.params.id
      },
      function(e, items) {
        if (e) {
          return res.send(500, 'No media given dongle ID');
        }
        res.status(200).jsonp(items);
      }
    );
  }
};

module.exports = ContentManager;
