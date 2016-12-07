# sonos-chime

Play a doorbell on Sonos. It uses a modified version of [node-sonos](https://github.com/yene/node-sonos).

## Learned
If you ask the player with SOAP he will not answer with native sonos uri (avTransportUri). If you want the native sonos uri you have to use upnp. The Sonos desktop client uses SOAP.
This project [https://github.com/jishi/node-sonos-discovery/](ode-sonos-discovery) is one of the cleanest implementation. It resubsubscribes from time to time.
For questions go to https://groups.google.com/forum/#!forum/python-soco
[How to subscribe](https://github.com/jishi/node-sonos-discovery/issues/98)

## notes on node-sonos
* currenttrack is missing uri and pos in queue
* selectTrack() is not documented
* setPlayMode not documented { NORMAL: true, REPEAT_ALL: true, SHUFFLE: true, SHUFFLE_NOREPEAT: true }[playmode.toUpperCase()]
* playback state not documented
* no getplaymode -> cannot restore back
* IP is not listed in devicedescription

## The Solution
1. get if playing, get current track, seekt time, get queue.
2. pause
3. add new dong song and play
4. set timeout (which has the length of it takes to play the song) before restoring previous state
5. select previous song, go to old seek time, restore play state
remove dong songs from queue
6. mode (repeat etc) should be the same as before

## Tests
Test the following by playing a song, then play dong, then compare before and after. Best with screenshots of the Sonos player.
- [ ] Play a song from spotify -> dong
- [ ] Play a song from google music -> dong
- [ ] Play a radio stream -> dong
- [ ] Play a song from network -> dong
- [ ] Check that the playmodes (repeat, shuffle) are restored
- [ ] Check that the volume is restored.

## Supported urls
```
x-file-cifs:*:*:*,
file:*:audio/mpegurl:*,
x-rincon:*:*:*,
x-rincon-mp3radio:*:*:*,
x-rincon-playlist:*:*:*,
x-rincon-queue:*:*:*,
x-rincon-stream:*:*:*
```
