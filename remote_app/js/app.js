'use strict';

/*
 * This app is the fallback for FoxCast where Addon are not available
 * in the platform (OS Version < 2.2). In this case we will send the
 * URL to our server in a different manner: using WebActivities.
 */

window.onload = function() {
  navigator.mozSetMessageHandler('activity', function(activityRequest) {
    var url = activityRequest.source.data.url;
    if(!url || url.length === 0){
      window.close();
      return;
    }
    
    DongleManager.get().then(function(dongle_id) {
      // Request to the server to create a new 'media' content
      // based on the URL
      FoxCast.create(
        {
          url: url,
          dongle_id: dongle_id,
          action:  'open'
        }, function(e, result) {
          if (e) {
            alert('ERROR WHILE CREATING MEDIA ' + JSON.stringify(e));
            return;
          }
          alert('Content sent to FoxCast!');
          setTimeout(function(){
            window.close();
          }, 2000);
        }
      );
    });
  });

  document.getElementById('delete-dongle').addEventListener(
    'click',
    function() {
      DongleManager.remove().then(function() {
        alert('Dongle deleted');
      });
    }
  );
};
