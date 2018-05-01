# liri-node-app
By: TJ Hooker
Date: April 30, 2018

This is a node.js app that runs from the terminal command line interface. The app takes in parameters in the CLI and returns data to the user. 

The liri-node-app sends requests to the Twitter, Spotify, and OMDB APIs and uses the following Node packages: 

1. twitter
2. Node-Spotify-API
3. Request
4. DotEnv

In addition, the liri app uses the require fs to read a txt file. 

The twitter and spotify keys are accessed using the dotenv package to set environmental variables. If the app is cloned from github the user must supply their own .env file with twitter and spotify keys for the application to run. 

INSTRUCTIONS:

Generally, using Node in the terminal, the user must manually input one of four command line calls:

1. my-tweets
2. spotify-this-song
3. movie-this
4. do-what-it-says. 

Each of these commands calls a function within the liri.js file and outputs a result to the user. Additionally, the user can add either a song or movie name to the end of the spotify-this-song or movie-this command and the app will return information about that song or movie. 

HOW IT WORKS:

1. my-tweets - returns 20 of the most recent tweets of a user. The function in the app hits the twitter API, limits the amount of tweets returned and only shows the time the tweet was created and the content of the tweet. User only needs to type: "my-tweets" in the CLI after initilizing Node and navigating to the liri.js file.
![my-tweets](https://github.com/winnie1312/grab/blob/master/grab-landingpage-winnie.gif)

2. spotify-this-song - returns a default song info if no user song is entered or returns information about the user's song if a song is entered. The command calls a function which hits the spotify API and returns information about a particular song. The returned information has been limited to the only the top four hits for that song. The information displayed from the returned object is the artist name, the song name, the album name, and a preview link of the song from Spotify. 
![spotify-this](https://github.com/winnie1312/grab/blob/master/grab-landingpage-winnie.gif)

3. movie-this - using the request Node package, this command returns a default movie if no user movie is entered. If a user enters a movie title after entering the CLI command, the command calls a function that requests the JSON from the OMDB API using the movie title. The code then displays only a subset of the available information for the movie.
![movie-this](https://github.com/winnie1312/grab/blob/master/grab-landingpage-winnie.gif)

4. do-what-it-says - by requiring fs, this CLI command calls a function that reads a text file with pre-filled information, containing a CLI command call (spotify-this-song) and a song title. The code then splits the information into an array and assigns the values of the array to the global variables used by the spotify-this-song and calls the nodeCommand function. The nodeCommand function then uses these global variables to call the spotify-this-song command and run the songPull function to get information about the song title in the txt file. 
![do-what-it-says](https://github.com/winnie1312/grab/blob/master/grab-landingpage-winnie.gif)

