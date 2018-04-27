var dotenv = require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


console.log("Testing dotenv: " + dotenv);
console.log("Testing process.env: " + process.env.SPOTIFY_ID);


var fs = require("fs");
// Stores the contents of the file inside data variable
fs.readFile("keys.js", "utf-8", function(error, data) {
  if (error) {
    return console.log(error);
  }
  console.log(data);

});

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// TWITTER HERE --------->
// var client = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });
 
// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });

 
