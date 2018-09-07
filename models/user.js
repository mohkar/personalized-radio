
var mongoCon = require('../db/mongodb.js')
var mongoWrapper = new mongoCon()
var config = require('../config/development.js')
var genres = config.genres
var collectionName = config.collections.userCollection
var ObjectId = require('mongodb').ObjectID

var insertRecord = function insertRecord(callback) {

	var userData = {}

	userData[genres.blues] = 0
	userData[genres.classical] = 0
	userData[genres.country] = 0
	userData[genres.disco] = 0
	userData[genres.hiphop] = 0
	userData[genres.jazz] = 0
	userData[genres.metal] = 0
	userData[genres.pop] = 0
	userData[genres.reggae] = 0
	userData[genres.rock] = 0
	userData['songsHistory'] = []

	console.log(mongoWrapper)
	mongoWrapper.post(collectionName, userData, function (err, result) {
		if (err) {
			console.log("Error while creating user record")
			callback(err, null)
			return
		}
		callback(null, true)
	})

}


var addReward = function addReward(data, callback) {

	var userId = ObjectId(data.userId)
	var genreId = data.genreId
	var reward = data.reward
	var queryOnId = {}
	queryOnId[genreId] = reward

	var userData = {
		key: {
			_id: userId
		},
		query: {
			$inc: queryOnId
		}
	}
	mongoWrapper.update(collectionName, userData, function(err, result) {
		callback(err, result)
	})

}

var getUserRecord = function getUserRecord(userId, callback) {

	mongoWrapper.findOne(collectionName, { _id : ObjectId(userId) }, function(err, result) {
		callback(err, result)
	})
}


module.exports = {
	insertRecord,
	addReward,
	getUserRecord
}


