var Sonos = require('Sonos').Sonos;
var sonos = new Sonos(process.env.SONOS_HOST || '192.168.1.38')

sonos.currentTrack(console.log);

//sonos.play('https://shiro.ch/dingdong.m4a', function (err, playing) {
 // console.log([err, playing])
//});

//player.play('x-rincon-buzzer:0', function (err, playing) {
//  console.log([err, playing]);
//});
