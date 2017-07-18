var mongoCon = require('../db/mongodb.js')
var mongoWrapper = new mongoCon()
var config = require('../config/development.js')
var genres = config.genres
var collectionName = config.collections.songCollection
var ObjectId = require('mongodb').ObjectID

var getSongById = function(id, callback) {

    console.log("===== route hit ===== /music/id", id)

    mongoWrapper.findOne(collectionName, { _id: id }, function(err, result) {
        callback(err, result)
    })
}

var getAllSongsByGenre = function(params, callback) {
    mongoWrapper.findLimit(collectionName, {
        classifiedGenre: params.classifiedGenre,
        _id: { $ne: params.id  }
    }, 10, function(err, result) {
        callback(err, result)
    })
}

var getRandomSongOfGenre = function(randomGenre, callback) {
    mongoWrapper.findLimit(collectionName, {
        classifiedGenre: randomGenre
    }, 1, function(err, res) {
        callback(err, res)
    })
}

module.exports = {
    getSongById,
    getAllSongsByGenre,
    getRandomSongOfGenre
}
