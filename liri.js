require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var inquirer = require('inquirer');
var Spotify = require("node-spotify-api");
var moment = require('moment');


inquirer.prompt([

    {
        type: "list",
        message: "What do you want to do bruh?",
        choices: ["look up a song", "look up a movie", "see what bands are in town"],
        name: "typeaway"
    },
    // Here we ask the user to confirm.

]).then(function (inquirerResponse) {
    //assign property to variable
    var typeaway = inquirerResponse.typeaway;
    // If the inquirerResponse chooses this option...
    if (typeaway === "see what bands are in town") {
        inquirer.prompt([

            {
                type: "input",
                message: "What band do you want to see?",
                name: "bandsget"
            },
        ]).then(function (bandsinfo) {
            var bands = bandsinfo.bandsget;
            var url = "https://rest.bandsintown.com/artists/" + bands + "/events?app_id=codingbootcamp";
            request(url, function (error, response, body) {

                console.log("Venue Name: " + JSON.parse(body)[0].venue.name);
                console.log("Venue Location: " + JSON.parse(body)[0].venue.city);
                console.log("Event Date: " + moment(JSON.parse(body)[0]).format("MM/DD/YYYY"));

                if (!error && response.statusCode === 200) {
                    console.log(error)
                }

                //console.log(response.dates);



            });
        })

    } else if (typeaway === "look up a movie") {
        inquirer.prompt([

            {
                type: "input",
                message: "What movie do you like?",
                name: "movieget",



            },
        ]).then(function (movieinfo) {
            var movie = movieinfo.movieget;

            var url = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

            request(url, function (error, response, body) {

                console.log(JSON.parse(body).Title);
                console.log(JSON.parse(body).Year);
                console.log(JSON.parse(body).Country);
                console.log(JSON.parse(body).Language);
                console.log(JSON.parse(body).Plot);
                console.log(JSON.parse(body).Actors);
                console.log(JSON.parse(body).imdbRating);





            });
        })
    }
    if (typeaway === "look up a song") {
        inquirer.prompt([

            {
                type: "input",
                message: "What song do you like?",
                name: "songget",



            },
        ]).then(function (songinfo) {

            var song = songinfo.songget;
            console.log(song);
            var spotify = new Spotify(keys.spotify);
            if (song === "") {
                console.log("no search term")
                song = 'Ace of Base: The Sign';
            }
            spotify.search({
                type: 'track',
                query: song
            }, function (err, data) {

                console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
                console.log("Song Name: " + data.tracks.items[0].name);
                console.log("Preview Link: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name);
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

            });
            
        });
    }
});