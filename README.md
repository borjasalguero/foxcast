# FoxCast

Share any web-based media or URL to your TV based on Firefox OS. The project will split in four well-differentiated modules:
- addon:
	Addons now are available in Firefox OS, so we are going to use this well-known feature to add more value to the web. When some video from any website is shown, we will display an icon to send that URL/Media to our TV.
	In order to install it properly (this is quite buggy yet), move your /addon folder to /apps folder and install it using `make reset-gaia`. You will need latest version of Firefox OS.
	Once you have it installed, check "Settings > Addons" and activate the addon if it's not activated previously.
- remote-app:
	For stable versions of Firefox OS, this is equivalent for the "addon". Just install it through the marketplacer or WebIDE, and when pressing 'share' in the browser (or any other app using this activity), the content could be sent to your TV (or 'mirror device' where you want to see the same content).
- dongle-app:
	This app will be installed in your TV or 'mirror device'. Will be in charge of receiving the info from the server, and open the URL/play the media we sent from the remote/addon's code.
- server:
	Server which will be in charge of handling messages coming from the addon and send all of them to the "app". Currently we are providing a test-server, but you can deploy your own server.

For pairing the TV and the remote app, just scan the QR code and share your content! If you want to renew your QR or removing previous pairing, just click on the top-right option in the UI.

Let's convert your Raspberry Pi with Firefox OS (or any other board as Panda) in a TV Dongle, or install it in your Panasonic TV or 'mirror device'.



[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/borjasalguero/foxcast/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

