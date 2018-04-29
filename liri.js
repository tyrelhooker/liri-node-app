var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");


console.log("Testing dotenv: " + dotenv);
console.log("Testing process.env: " + process.env.SPOTIFY_ID);





var spotify = new Spotify(keys.spotify);
console.log("\n++++++++++++++++++++++++++++++" + "\nSPOTIFY KEYS: " + "\n" + JSON.stringify(spotify, null, 2));
var client = new Twitter(keys.twitter);
console.log("\n++++++++++++++++++++++++++++++" + "\nTWITTER KEYS: " + "\n" + JSON.stringify(client, null, 2));

// TWITTER HERE --------->
// var client = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });

function tweetPull() {
  var params = {screen_name: 'herewhengone'};
  client.get('statuses/user_timeline', count=20, function(error, tweets, response) {
    if (!error) {
      // console.log(JSON.stringify(tweets, null, 2));
      // for (var created_at in tweets) {
      //   console.log(tweets.created_at);
      // }
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at + "\n" + tweets[i].text);
      }
    }
  });
}

function songPull() {

  spotify.search({ type: 'track', query: songOrMovie, limit: 1}, function(err, data) {
      if (err) {
          console.log('Error occurred: ' + err);
          return;
      }
      // Do something with 'data' 
      console.log(JSON.stringify(data, null, 2));
      // console.log(data);
      var artist = data.tracks.items[0].album.artists[0].name;
      var song = data.tracks.items[0].album.artists[0].name;
      var album = data.tracks.items[0].album.name;
      console.log("testing spotify JSON: " + artist + album);
      
  });
}

function moviePull() {
  songOrMovie = "Mr." + "+" + "Nobody";
  console.log(songOrMovie);
  // Runs a request to the OMDB API with user movie input
  request("http://www.omdbapi.com/?t=" + songOrMovie + "&apikey=trilogy", function(error, response, body) {
    console.log(songOrMovie);
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      body = JSON.parse(body)
      console.log(body.Title);
    }
  });
}

function zombieSong() {
  // Stores the contents of the file inside data variable
  fs.readFile("random.txt", "utf-8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log("check if access txt file: " + data);
  });
}


var userInput = process.argv[2];
var songOrMovie = process.argv[3];
if (userInput === "my-tweets") {
  tweetPull();
}
else if (userInput === "spotify-this-song") {
  songPull();
}
else if (userInput === "movie-this") {
  moviePull();
}
else if (userInput === "do-what-it-says") {
  zombieSong();
}


 
