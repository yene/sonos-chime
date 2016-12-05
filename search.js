/*jshint esversion: 6 */

var sonos = require('Sonos');

sonos.search(function(device) {
  // device is an instance of sonos.Sonos
  device.getPlayMode(console.log);
  device.currentTrack(console.log);
});


