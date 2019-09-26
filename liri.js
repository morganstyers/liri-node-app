require("dotenv").config();
var fs = require('fs')
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var userCommand = process.argv[2];
var term = process.argv.slice(3).join(" ");
function Commands(userCommand, userInput) {
    var userCommand = process.argv[2];
    var userInput = process.argv[3];

    switch (userCommand) {
        case 'concert-this':
            if (!userInput) {
                console.log("uh oh! You forgot to tell me who you want to see.")
            } 
             else{
                 goTo(userInput);
                }
            break;

        case 'spotify-this-song':
                if(!userInput){
                    userInput==="The-Sign"
                }else{
            listenTo(userInput);}
            break;
        default:

        case 'movie-this':
            watch(userInput)
            break;

        case 'do-what-it-says':
            simonSays(userInput)
            break;
    }
}

function goTo(userInput) {
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
            })
        })
}
function listenTo(userInput) {
    spotify
    spotify.search({type: 'track' , query: userInput, limit: 5})
    .then(function(response) {
    var info=response.tracks.items;

    for (var i = 0; i < info.length; i++) {
     
        console.log("artist(s): " + (info[i].artists));
        console.log("song name: " + info[i].name);
        console.log("preview song: " + info[i].preview_url);
        console.log("album: " + info[i].album.name);
        console.log("-----------------------------------");
    }})
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });
}
function watch(userInput) {
    var URL=("http://www.omdbapi.com/?q="+ userInput +"&y=&plot=short&apikey=trilogy")
    axios.get(URL)
.then(function(response){
var movie=response.data;
movieData=`
movie title: ${movie.title}`;
console.log(movie)
})

}
function simonSays() {
    console.log("bossy bossy")

    fs.readFile('random.txt', (err, data) => {
        if (err) throw err;
        console.log(data);
      

        var dataArr = data;

        if (dataArr.length === 2) {
            options(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
            options(dataArr[0]);
        }
    });
};
      

      

Commands();
