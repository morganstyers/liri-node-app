require("dotenv").config();
var fs = require('fs')
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

function app() {
  switch (command) {
    case 'go':
      go(input);
      break;

    case 'listen':
      listen(input);
      break;

    case 'watch':
      watch(input);
      break;

    case 'do-this':
      random();
      break;

    default:
      console.log("Hello! I'm Liri.Type any of the following commands:\ngo \nlisten \nwatch \ndo-this");
      break;
  }
}

function watch(input) {
  if (!input) {
    input = "Mr. Nobody";
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(
    function (response) {
     
      var movies = (response.data);
      var plot=movies.Plot;
    
      console.log("\n---------------------------------------------------\n");
      console.log("Title: " + movies.Title)
      console.log("Year: " + movies.Year)
      console.log("Starring: " + movies.Actors)
      console.log("\nPlot:" + '\v'+ plot.slice(0,107)+'\n'+plot.slice(107)+"\n");
      console.log("Language: " + movies.Country)
      console.log("IMDB Rating: " + movies.imdbRating)
      console.log("Rotten Tomatoes Gives It A: " + movies.Ratings[1].Value)
      console.log("\n---------------------------------------------------\n");
    })
}

function listen(input) {
  if (!input) {
    input = "The Sign Ace Of Base";
  }
  spotify.search({
    type: 'track',
    query: input,
  }, (function (error, response) {
    var info = response.tracks.items;

    if (error) {
      console.log("ERROR OCCURRED" + error);
      return;
    }
    console.log('\n-----------------------------')
    console.log("Artist: " + (info[0].artists[0].name));
    console.log("Song: " + (info[0].name));
    console.log("Album: " + (info[0].album.name));
    console.log("Preview: " + (info[3].preview_url))
    console.log('\n-----------------------------')

  })
  )
}
function go(input) {
  if (!input) {
    input = "Fleetwood Mac"
  }
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
      input +
      "/events?app_id=codingbootcamp"
    )
    .then(function (response) {
      console.log(`-------------------------------
Okay, ${input} is playing some events:
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
      })
    })
}
function random() {
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) throw err;
    var doIt = data.split(",");
    var it = doIt[1];
    var whatDo = doIt[0];

    if (whatDo === 'listen') {
      listen(it)
    }
    if (whatDo === 'go') {
      go(input)
    }
    if (whatDo === 'watch') {
      watch(input)
    }
  })
}
app();
