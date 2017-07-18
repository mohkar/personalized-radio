var ffmetadata = require("ffmetadata");
var fs = require('fs')

console.log(fs.readFileSync("/Users/mohsinkarovaliya/contrib/pied-piper/music/free.mp3"))

// Read song.mp3 metadata
ffmetadata.read("/Users/mohsinkarovaliya/contrib/pied-piper/music/1.mp3", function(err, data) {
    if (err) console.error("Error reading metadata", err.message)
    else console.log(data)
});

// Set the artist for song.mp3
// var data = {
//   artist: "Me",
// };
// ffmetadata.write("song.mp3", data, function(err) {
//     if (err) console.error("Error writing metadata", err);
//     else console.log("Data written");
// });