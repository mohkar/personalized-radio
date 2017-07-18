var userModel = require('../models/user.js')
var config = require('../config/development.js')
var songModel = require('../models/song.js')
var discoveryModule = require('./discovery.js')
var genreModule = require('./genre.js')

function recommendNextSong(data, callback) {

	var userId = data.userId 
	var previousSongId = data.songId 
	var seekedTime = data.seekedTime

	if (previousSongId === undefined) {
		// discoveryModule.getNextGenreBasedOnReward(userId, function(genreName) {
		// 	console.log("genreName selected ====" , genreName)
		// 	genreModule.getNextSong(genreName, function(nextSongDetails) {
		// 		var songDetails = createResponseFromSongDetails(nextSongDetails)
		// 		callback(null, songDetails)
		// 	})
		// })

		genreModule.getRandomSong(function(nextSongDetails) {
			console.log("====++==", nextSongDetails)
			var songDetails = createResponseFromSongDetails(nextSongDetails)
			callback(null, songDetails)
		}) 

	} else {

		songModel.getSongById(previousSongId, function(err, res) {

			if (err) {
				console.log("error while getting song", err)
				callback(err, null)
			} else {
				var genre = res.genre
				var reward = getRewardScore(seekedTime)
				
				discoveryModule.addReward({
					userId: userId,
					genre: genre,
					reward: reward
				}, function(err, _res) {

					discoveryModule.getNextGenreBasedOnReward(userId, function(genreName) {
						console.log("genre===", genreName)

						genreModule.getNextSong(res, function(nextSongDetails) {

							console.log("next song=====", nextSongDetails._id)
							var songDetails = createResponseFromSongDetails(nextSongDetails)
							callback(null, songDetails)
						})
					})

				})

			}

		})
	}

}

function createResponseFromSongDetails(songDetails) {
	return {
		_id: songDetails._id,
		songId: songDetails.fileName,
		fileName: songDetails._id + ".mp3",
		artist: songDetails.artist,
		album: songDetails.album,
		genre: songDetails.genre,
		title: songDetails.title 
	}
}

function getRewardScore(length) {
	return config.reward(length)
}

module.exports = {
	recommendNextSong
}