require("dotenv").config();
var fs = require('fs')
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');

var userCommand = process.argv[2];
var term = process.argv.slice(3).join(" ");
function Commands(userCommand, userInput) {
    var userCommand = process.argv[2];
    var userInput = process.argv[3];

    switch (userCommand) {
        case 'concert-this':
                if (!userInput) {
                    console.log("uh oh! You forgot to tell me who you want to see.")
                } else{
            axios
                .get(
                    "https://rest.bandsintown.com/artists/" +
                    userInput +
                    "/events?app_id=codingbootcamp"
                )
                .then(function (response) {
                    console.log(`-------------------------------
Okay, ${userInput} is playing some events:
`)

                    const concertArray = response.data;

                    concertArray.forEach(function (response) {
                        const formattedDate = moment(response.datetime).format(
                            "MM/DD/YYYY"
                        );
                        console.log(`${response.venue.name}- 
${response.venue.city}, ${response.venue.region}
${formattedDate}
`);
                        });
                    });
                }
            break;

        case 'spotify-this-song':
            listenTo(userInput);
            break;

        case 'movie-this':
            watch(userInput)
            break;

        case 'do-what-it-says':
            simonSays(userInput)
            break;
    }
}

function listenTo() {
    console.log("this will be spotify")
}
function watch() {
    console.log("this will be movie info")
}
function simonSays() {
    console.log("bossy bossy")
}




Commands();
