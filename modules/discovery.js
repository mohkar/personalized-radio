var userModel = require('../models/user.js')
var config = require('../config/development.js')

var addReward = function(data, callback) {

	userModel.addReward(data, function (err, res) {
		callback(err, res)
	})
}

var getNextGenreBasedOnReward = function(userId, callback) {
	userModel.getUserRecord(userId, function(err, res) {

		if (err) {
			return
		}

		var allGenresArray = Object.keys(config.genres)

		var maxReward = []
		var currentMax = res[allGenresArray[0]]

 		for (var i = 1, len = allGenresArray.length; i < len; i++) {

 			var currentGenre = allGenresArray[i]
  			if (res[currentGenre] > currentMax) {
  				maxReward = []
  				maxReward.push(currentGenre)
  				currentMax = res[currentGenre]
  			} else if (res[currentGenre] === currentMax){
  				maxReward.push(currentGenre)
  			}

		}

		if (maxReward.length == 1) {
			callback(maxReward[0])
		} else {
			callback(randomGenreFrom(maxReward))
		}
	})
}


function getRewardScore(length) {
	return config.reward(length)
}

function createUser() {
	userModel.insertRecord(function(err, res) {
		console.log("======", err, res)
	})
}

function randomGenreFrom(genreArr) {
	console.log("randommm", genreArr)
	return genreArr[Math.floor(Math.random() * (genreArr.count))]
}

module.exports = {
	getNextGenreBasedOnReward,
	addReward
}

// setTimeout(function() {
// 	// createUser()
// 	addReward("5932f01006507333d6d70750", "hiphop", 100)
// // 	getNextGenreBasedOnReward("593283a93b7b2c06604d9d15", function(genre) {
// // 		console.log(genre)
// // 	})
// }, 1000)
