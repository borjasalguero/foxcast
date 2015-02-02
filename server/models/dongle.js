var mongoose = require('mongoose');
var simplePush = require('../simple_push/simple_push.js');
var Schema = mongoose.Schema;

var DongleSchema = new Schema({
  endpoint: String,
  pushversion : { type: Number, default: 1 },
  created: { type: Date, default: Date.now() }
});

var DongleModel = mongoose.model('Dongle', DongleSchema);

var DongleManager = {
  // Register a dongle given endpoint and alias. If alias is not
  // defined maybe we shold add a custom one.
  register: function(req, res) {
    console.log('Lets store the item ' + JSON.stringify(req.body));
    var dongle = new DongleModel(req.body);
    dongle.save(function(e, dongleCreated) {
      if(e) {
        return res.send(500, err.message);
      }
      res.status(200).jsonp(dongleCreated);
    });
  },
  notify: function(id, callback) {
    DongleModel.find(
      {
        _id: id
      },
      function(e, result) {

        if (e) {
          callback(e);
          return;
        }
        var dongle = result[0];

        if (!dongle || !dongle.pushversion) {
          callback({
            message: 'Dongle ' + id + 'does not exists'
          });
          return;
        }
        dongle.pushversion++;
        dongle.save(function(e, user) {
          if (e) {
            callback(e);
            return;
          }
          console.log('Send push to ' + dongle.endpoint);
          console.log('With version ' + dongle.pushversion);
          simplePush.notify(dongle.pushversion, dongle.endpoint);
          callback();
        });
      }
    );
  }
};

module.exports = DongleManager;
