# JobCheckerForRainForest
Chrome Extension w/ node.js server (Express)

In the ext folder, it's source file of the Chrome Broswer Extension

In the server folder, it's the nodejs server that you can run and the extension will connect/ping via localhost:3000.


This is a just a test extension to compare how Rainforest's extension work.   I am having an issue with their extension because it doesn't open a tab quickly enough to load a job.

What does this extension do?

It's really simple,  it just ping the nodejs server every 5 seconds and ask if there is a job,  the server will response no until 5th time.   At the 5th time, the server will say yes, and supply an URL (web link).   The extension will still create new tab ASAP after the server say yes.

You'll see extension's button with smiley face also w/ a badge, "NO".    When job is available, the badge will turn to Green "YES".  New tab will be created ASAP.

You can click the button to reset the server's counter back to 0.   Because the server will only say "YES" at 5th time only.

This project is only to address that there's no delay in creating a tab function even if the server is still loading.
