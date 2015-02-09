'use strict';

/*
 * This app is the fallback for FoxCast where Addon are not available
 * in the platform (OS Version < 2.2). In this case we will send the
 * URL to our server in a different manner: using WebActivities.
 */

window.onload = function() {
  DongleManager.get().then(function(dongle_id) {
    var messagesDongle = document.getElementById('messages-dongle');
    messagesDongle.textContent = 'TV Paired!';
    messagesDongle.setAttribute('color', 'green');
    messagesDongle.removeAttribute('loading');

    navigator.mozSetMessageHandler('activity', function(activityRequest) {
      document.body.classList.remove('scanning');
      var url = activityRequest.source.data.url;
      if(!url || url.length === 0){
        window.close();
        return;
      }
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
          setTimeout(function(){
            window.close();
          }, 1500);
        }
      );
    });
  });
  document.getElementById('cancel-share').addEventListener(
    'click',
    function(){
      window.close();
    }
  );
  document.getElementById('delete-button').addEventListener(
    'click',
    function() {
      DongleManager.remove().then(function() {
        var messagesDongle = document.getElementById('messages-dongle');
        messagesDongle.textContent = 'TV Removed';
        messagesDongle.setAttribute('color', 'red');
        setTimeout(function(){
          window.location.reload();
        }, 1500)
      });
    }
  );
};
