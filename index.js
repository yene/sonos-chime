/*jshint esversion: 6 */

// URL to a song file with a door gong.
const CHIME_URL = 'https://shiro.ch/dingdong.m4a';
// How long to wait until old state is resumed
const CHIME_TIMEOUT = 3000;
const CHIME_VOLUME = 100;


var async = require("async");
var sonos = require('Sonos');
var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var port = process.argv[2] || 8888;

var dongInUse = false;

/*
sonos.search(function(device) {
  // device is an instance of sonos.Sonos
  device.currentTrack(console.log);
});
*/

/*
  Open url to play on all, or give ?ip=192.168.1.1
  to play on specific device.
*/

//    var player = new sonos.Sonos(process.env.SONOS_HOST || '192.168.1.38'); // 192.168.198.207 192.168.1.38
// playDong(player);

var player = new sonos.Sonos('192.168.198.207');
playDong(player);
/*
http.createServer(function(request, response) {
  if (dongInUse) {
    response.writeHead(500, {"Content-Type": "text/plain"});
    response.write("Chime is playing already.\n");
    response.end();
    return;
  }

  var uri = url.parse(request.url).pathname;
  var query = url.parse(request.url,true).query;

  if (query.ip && query.ip.length > 0) {
    console.log('found custom ip', query.ip);
    var player = new sonos.Sonos(query.ip);
    playDong(player);
  } else {
    sonos.search(function(player) {
      playDong(player);
    });
  }

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(uri + "\n");
  response.end();
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
*/
function playDong(player) {
  // default state
  var volume = 15;
  var state = 'playing'; // playing, stopped, paused
  var track = { position: 0, duration: 0, playlistposition:1, uri: '' };
  var items = [];
  var mode = 'NORMAL';

  dongInUse = true;

  async.series([
    // save state
    function(callback){
      player.getVolume(function(err, v) {
        volume = v;
        callback(null, null);
      });
    },
    function(callback){
      player.getCurrentState(function(err, s) {
        state = s;
        callback(null, null);
      });
    },
    function(callback){
      player.getMuted(function(err, m) {
        muted = m;
        callback(null, null);
      });
    },
    function(callback){
      player.getPlayMode(function(err, m) {
        mode = m;
        callback(null, null);
      });
    },
    function(callback){
      player.currentTrack(function(err, t) {
        track = t;
        console.log('track', t);
        console.log('uri', t.uri);
        callback(null, null);
      });
    },
    function(callback){
      player.getQueue(function(err, q) {
        items = q.items;
        callback(null, null);
      });
    },
    function(callback){
      player.pause(function(err, data) {
        callback(null, null);
      });
    },
    function(callback){
      player.setVolume(CHIME_VOLUME, function(err, data) {
        callback(null, null);
      });
    },
    // play dong
    function(callback){
      player.play(CHIME_URL, function (err, playing) {
        console.log('playing', [err, playing]);
        setTimeout(function(){
          callback(null, null);
        }, CHIME_TIMEOUT);
      });
    },
    // restore state, and remove new added dong
    function(callback){
      player.removeTrack(items.length+1, function(err, data) {
        callback(null, null);
      });
    },
    function(callback){
      player.setVolume(volume, function(err, data) {
        callback(null, null);
      });
    },
    function(callback){
      player.setMuted(muted, function(err, data) {
        callback(null, null);
      });
    },
    function(callback){
      if (state == 'playing') {
        player.selectTrack(track.playlistposition, function(err, data) {
          player.play(function(err, data) {
            if (track.position > 0) {
              player.seek(track.position, function(err, data) {});
            }
            callback(null, null);
          });
        });
      }

      if (state == 'paused') {
        player.selectTrack(track.playlistposition, function(err, data) {
          if (track.position > 0) {
            player.seek(track.position, function(err, data) {});
          }
          callback(null, null);
        });
      }
    }
  ], function(err, results) {
    console.log('results', err);
    dongInUse = false;
  });
}


