'use strict';

/*
 * This app is the fallback for FoxCast where Addon are not available
 * in the platform (OS Version < 2.2). In this case we will send the
 * URL to our server in a different manner: using WebActivities.
 */

window.onload = function() {

  // TODO Aquí va la implementación de la actividad. Escucharemos por
  // un evento, y dentro de el encontraremos la URL a compartir.
  // Como ejemplo, ahora mismo el funcionamiento está hecho con un
  // botón que envía una URL al servidor. Sustituir el botón y la URL
  // fija por una actividad y una URL dinámica.

  document.getElementById('send-to-dongle').addEventListener(
    'click',
    function() {
      DongleManager.get().then(function(dongle_id) {
        alert(dongle_id);
        // Request to the server to create a new 'media' content
        // based on the URL
        FoxCast.create(
          {
            url: 'http://www.telefonica.es', // MODIFICAR ESTO!
            dongle_id: dongle_id,
            action:  'open'
          }, function(e, result) {
            if (e) {
              alert('ERROR WHILE CREATING MEDIA ' + JSON.stringify(e));
              return;
            }
            alert('Content sent to FoxCast!');
          }
        );
      });
    }
  );

  document.getElementById('delete-dongle').addEventListener(
    'click',
    function() {
      DongleManager.remove().then(function() {
        alert('Dongle deleted');
      });
    }
  );
};
