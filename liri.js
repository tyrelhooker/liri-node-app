var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var userInput = process.argv[2];
var nodeArgs = process.argv;
var movieName = "";
var songName = "";

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

// Takes user node inputs in terminal after node input initiating functions and formats the inputs for spotify and omdb functions
function inputConverter() {
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

// Shows 5 tracks in terminal corresponding to user node song input. If no input, shows default song from Spotify.
function songPull() {
  if (!songName) {
    console.log("\nSPOTIFY TRACK SEARCH RESULTS - missing user input: ");
    spacingLines();
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
        console.log("Artist: " + artist + "\nSong Name: " + song + "\nAlbum: " + album + "\nPreview Link: " + preview + "\n");
      }
    });
  }
  else {
    console.log("\nSPOTIFY TRACK SEARCH RESULTS - user input: ")
    spacingLines();
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
        console.log(i + " - " + "Artist: " + artist + "\n    Song Name: " + song + "\n    Album: " + album + "\n    Preview Link: " + preview + "\n");
      }
    });
  }
}

// Runs a request to the OMDB API with user movie node input. If no input, shows default song from Spotify.
function moviePull() {
  // If node 3 on is empty then saves a default movie to the movieName variable
  if (!movieName) {
    movieName = "Mr.+Nobody"
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";
  request(queryUrl, function(error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      var bodyObj = JSON.parse(body);
      // console.log(bodyObj);
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
    }
  });
}

function zombieSong() {
  // Stores the contents of the file inside data variable
  fs.readFile("random.txt", "utf-8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
    data = data.split(",");
    console.log(data);
    userInput = data[0];
    console.log(userInput);
    songName = data[1];
    console.log(songName);
    songName = songName.substr(1, songName.length-2);
    console.log(songName);
    songPull();
  });
}


// ******** MAIN CODE ********
// Takes user node input by the 'keywords' in terminal and calls functions based on the keywords
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


 
