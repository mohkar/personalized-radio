// import the modules required in our program
var express = require('express')
var fs = require('fs')
var recommendationModule = require('./modules/recommend.js')
var baseDirectory = "/Users/mohsinkarovaliya/coderush/english/"
// initialize an express app
var app = express()


// declare public directory to be used as a store for static files
app.use('/public', express.static(__dirname + '/public'))
app.use(function(request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,time')
    response.setHeader('Access-Control-Allow-Credentials', true)
    next()
})
// make the default route to serve our static file
app.get('/', function(req, res) {

    return res.redirect('/public/home.html');

})

app.get('/register', function(req, res) {

})

app.get('/meta/:id?', function(req, res) {
    var userId = req.headers.userid || "5932f01006507333d6d70750"
    var time = req.headers.time || 250
    var songId = req.params.id
    if (songId !== undefined) {
        songId = "english/" + songId
    }
    // var userId = "5932f01006507333d6d70750"
    // var songId = "english/111b5cc65c2e78163213923d5bcf9bdf85808904"

    var data = {
        userId: userId,
        seekedTime: time,
        songId:  songId
    }

    recommendationModule.recommendNextSong(data, function(err, songDetails) {
    // var file = __dirname + '/music/' + fileName;

        if (err) {
            res.send("No Song found")
            res.end()
            return
        }

        var songDetails = {
            artist: songDetails.artist,
            genre: songDetails.genre,
            title: songDetails.title,
            album: songDetails.album,
            songId: songDetails.songId
        }

        res.send(songDetails)
        res.end()
    })

})

app.get('/music/:id', function(req, res) {

    var userId = req.headers.userid || "5932f01006507333d6d70750"
    var songId = req.params.id
    var file = baseDirectory + songId + ".mp3"

    fs.exists(file, function(exists) {
        if (exists) {
            var stat = fs.statSync(file)
            res.writeHead(200, {
                'Content-Type': 'audio/mp3',
                'Content-Length': stat.size
            })
            var rstream = fs.createReadStream(file);
            rstream.pipe(res);
        } else {
            res.send("Its a 404");
            res.end();
        }
    });
});

// start app on port 3003 and log the message to console
var PORT = 8080
app.listen(PORT, function() {
    console.log('App listening on port' + PORT);
})
