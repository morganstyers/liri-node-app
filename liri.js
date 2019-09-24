require("dotenv").config();
var fs= require('fs')
var keys = require("./keys.js");


function Commands(userCommand, userInput) {
    var userCommand = process.argv[2];
    var userInput = process.argv[3];

    switch (userCommand) {
        case 'concert-this':
            findConcert(userInput);
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
function findConcert() {
    console.log("this will be bands in town")
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