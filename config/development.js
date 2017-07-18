

var config = {}

// config.reward.length = {
// 	10: -2,
// 	50: -1,
// 	100: 0,
// 	150: 1,
// 	200: 2,
// 	250: 3,
// 	300: 4
// }

config.reward = function(length) {

	var reward
	if (length < 10) {
		reward = -2
	} else if (length < 50) {
		reward = -1
	} else if (length < 100) {
		reward = 0
	} else if (length < 150) {
		reward = 1
	} else if (length < 200) {
		reward = 2
	} else if (length < 250) {
		reward = 3
	} else if (length < 300) {
		reward = 4
	} else {
		reward = 5
	}

	return reward

}

config.genres = {
	blues : "blues",
	classical: "classical",
	country: "country",
	disco: "disco",
	hiphop: "hiphop",
	jazz: "jazz",
	metal: "metal",
	pop: "pop",
	reggae: "reggae",
	rock: "rock"
}

config.collections = {
	songCollection: 'songs',
	userCollection: 'users'
}

config.parentDirectory = __dirname

module.exports = config