var spawn = require("child_process").spawn;
var songModel = require('../models/song.js')
var config = require('../config/development')
var PythonShell = require('python-shell');
/**
 * songData
 * {
        songMap: {
            '[1, 2, 3, 4, 5, 6, 7, 8]': '4nfsdfsdfd'
        },
        keys: [
            [1, 2, 3, 4, 5, 6, 7, 8],
            [2, 3, 4, 5, 6, 7, 8, 9],
            [10, 12, 99, 1, 5, 31, 2, 3]
        ]
    }

    songPoint {
        point: [1, 2, 3, 4 ,5]
    }
 */

var getNextSong = function(prevSongDetails, callback) {

    var features = prevSongDetails.features || []
    console.log("===== prevSongDetails===", prevSongDetails)
    songModel.getAllSongsByGenre(prevSongDetails, function(err, res) {
        if (err) {
            console.log("error in getNextSong genre.js", err)
            return
        }
        // callback(res[0])
        var structuredData = getStructureSongData(res)
        findSimilarSong({
            songData: structuredData,
            songPoint: {
                point: features
            }
        }, function(nextSongId) {
            for (var i = 0; i < res.length ; i++ ) {
                if (res[i]['fileName'] == nextSongId) {
                    callback(res[i])
                    break;
                }
            }
        })

    })

}

var getRandomSong = function(callback) {
    var randomGenre = getRandomGenre()
    songModel.getRandomSongOfGenre(randomGenre, function(err, res) {
        if(err) {
            return
        } 
        callback(res[0])

    })
}

var getRandomGenre = function () {
    var allGenresArray = Object.keys(config.genres)
    return allGenresArray[Math.floor(Math.random() * (allGenresArray.length))]
}

var getStructureSongData = function(data) {
    var songData = {}
    var songMap = {}
    var keys = []

    data.forEach(function(songDetails) {

        var songId = songDetails.fileName
        var features = songDetails.features

        songMap[songId] = features
        keys.push(features)
    })

    songData["songMap"] = songMap
    songData["keys"] = keys

    return songData
}

var findSimilarSong = function(params, callback) {

    console.log("=+++++++", params)
    var scriptPath = config.parentDirectory.split('/')
    scriptPath.pop()
    scriptPath = scriptPath.join('/')

    var options = {
        mode: 'text',
        pythonPath: '/usr/local/bin/python',
        pythonOptions: ['-u'],
        scriptPath: scriptPath + '/scripts',
        args: [JSON.stringify(params.songData), JSON.stringify(params.songPoint)]
    };

    PythonShell.run('similar.py', options, function(err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
        callback(results[0])
    })
}


module.exports = {
    getNextSong,
    getRandomSong
}
