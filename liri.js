var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// console.log("Testing dotenv: " + dotenv);
// console.log("Testing process.env: " + process.env.SPOTIFY_ID);
// console.log("\n++++++++++++++++++++++++++++++" + "\nSPOTIFY KEYS: " + "\n" + JSON.stringify(spotify, null, 2));
// console.log("\n++++++++++++++++++++++++++++++" + "\nTWITTER KEYS: " + "\n" + JSON.stringify(client, null, 2));

// Creates lines under called function for ease of reading in terminal.
function spacingLines() {
  var spacingLinesArr = [];
  for (var i = 0; i < 50; i++) {
    spacingLinesArr.push("-");
  }
  spacingLinesArr = spacingLinesArr.join(""); 
  console.log(spacingLinesArr);
}

// Shows 20 tweets in terminal from twitter account
function tweetPull() {
  client.get('statuses/user_timeline', count=20, function(error, tweets, response) {
    if (!error) {
      console.log("\nMY TWEETS");
      spacingLines();
      for (var i = 0; i < tweets.length; i++) {
        console.log(i + " - " + tweets[i].created_at + "\n" + tweets[i].text);
      }
    }
  });
}
// Shows 5 tracks in terminal corresponding to user song input. If no input, shows default song from Spotify.
function songPull() {
  if (!songName) {
    spotify.search({ type: 'track', query: "The Sign Ace of Base", limit: 1}, function(err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      }
      var dataCombo = data.tracks.items;
      for (var i = 0; i < dataCombo.length; i++) {
        var artist = dataCombo[i].album.artists[0].name;
        var song = dataCombo[i].name;
        var album = dataCombo[i].album.name;
        var preview = dataCombo[i].preview_url;
        console.log("Artist: " + artist + "\nSong Name: " + song + "\nAlbum: " + album + "\nPreview Link: " + preview);
      }
    });
  }
  else {
    spotify.search({ type: 'track', query: songName, limit: 4}, function(err, data) {
      if (err) {
          console.log('Error occurred: ' + err);
          return;
      }
      // console.log(JSON.stringify(data, null, 2));
      var dataCombo = data.tracks.items;
      for (var i = 0; i < dataCombo.length; i++) {
        var artist = dataCombo[i].album.artists[0].name;
        var song = dataCombo[i].name;
        var album = dataCombo[i].album.name;
        var preview = dataCombo[i].preview_url;
        console.log("Artist: " + artist + "\nSong Name: " + song + "\nAlbum: " + album + "\nPreview Link: " + preview);
      }
    });
  }
}

var nodeArgs = process.argv;
var movieName = "";
var songName = "";

function inputConverter() {
  // var nodeArgs = process.argv;
  // var movieName = "";
  // var songName = "";
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
      songName = songName + "+" + nodeArgs[i];
    }
    else {
      movieName += nodeArgs[i];
      songName += nodeArgs[i];
    }
  }
}

function moviePull() {
  
  // var nodeArgs = process.argv;
  // var movieName = "";
  // for (var i = 3; i < nodeArgs.length; i++) {
  //   if (i > 3 && i < nodeArgs.length) {
  //     movieName = movieName + "+" + nodeArgs[i];
  //   }
  //   else {
  //     movieName += nodeArgs[i];
  //   }
  // }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";
  console.log("queryUrl Check: " + queryUrl);
  // songOrMovie = "Mr." + "+" + "Nobody";
  // console.log(songOrMovie);
  // Runs a request to the OMDB API with user movie input
  request(queryUrl, function(error, response, body) {
    console.log(movieName);
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      var bodyObj = JSON.parse(body);
      console.log(bodyObj);
      console.log("\nMOVIE THIS: "); 
      spacingLines();
      console.log(
        "Movie Title: " + bodyObj.Title + 
        "\nYear of Release: " + bodyObj.Year +
        "\nIMDB Rating: " + bodyObj.Ratings[0].Value +
        "\nRotten Tomatoes Rating: " + bodyObj.Ratings[1].Value + 
        "\nCountry of Production: " + bodyObj.Country +
        "\nLanguage: " + bodyObj.Language +
        "\nPlot: " + bodyObj.Plot +
        "\nActors: " + bodyObj.Actors
      );
      // console.log(JSON.parse(body).Year);
      // console.log("testing body type: " + body);
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
// var songOrMovie = process.argv[3];
if (userInput === "my-tweets") {
  tweetPull();
}
else if (userInput === "spotify-this-song") {
  inputConverter();
  songPull();
}
else if (userInput === "movie-this") {
  inputConverter();
  moviePull();
}
else if (userInput === "do-what-it-says") {
  zombieSong();
}


 
