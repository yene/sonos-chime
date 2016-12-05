# sonos-chime

Example on how to play a doorbell on sonos.

## TODO
* Check how sonos plays radio, can I play the chime as a radio stream
* host HTTP server
* test switching to a radiostation
* test with multiple sonos
* UI with chime file or url. Webhook display.
* IFTTT integration
* HomeKit integration
* Handle when no track is running
* Does radio work
* Does stream from airsonos work

## Steps
* Save current state
* play chime
* restore last state

## How to use it
* Simple webhook example

## notes on node-sonos
* currenttrack is missing uri and pos in queue
* selectTrack() is not documented
* setPlayMode not documented { NORMAL: true, REPEAT_ALL: true, SHUFFLE: true, SHUFFLE_NOREPEAT: true }[playmode.toUpperCase()]
* playback state not documented
* no getplaymode -> cannot restore back
* IP is not listed in devicedescription

## sonos flow
* get if playing, get current track, seekt time, get queue.
* pause
* add new dong song and play
* set timeout (which has the length of it takes to play the song) before restoring previous state
* select previous song, go to old seek time, restore play state
remove dong songs from queue
* mode (repeat etc) should be the same as before

## Supported urls
x-file-cifs:*:*:*,
file:*:audio/mpegurl:*,
x-rincon:*:*:*,
x-rincon-mp3radio:*:*:*,
x-rincon-playlist:*:*:*,
x-rincon-queue:*:*:*,
x-rincon-stream:*:*:*
