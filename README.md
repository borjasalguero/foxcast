# FoxCast

Share any web-based media or URL to your MediaBox based on Raspberry Pi and Firefox OS. The project will split in 3 well-differentiated modules:
- addon:
	Addons now are available in Firefox OS, so we are going to use this well-known feature to add more value to the web. When some video from any website is shown, we will display an icon to send that URL/Media to our TV.
- app:
	This app will be installed in the Media Box. It will be the one in charge of receiving the info from the server, and open the URL/play the media we sent from the addon's code.
- server:
	Server which will be in charge of handling messages coming from the addon and send all of them to the "app".

Based on this approach we will be able to send any web-based content to other dongle. We will get both of them (app & addon) paired based on a QR code.

