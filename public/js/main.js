
$(document).ready(function() {
  var globals = {};

  var play = function (e, autoplay, time) {

    var songId = localStorage.getItem("songId");

    if (songId)
      metaUrl = "http://127.0.0.1:8080/meta/" + songId;
    else
      metaUrl = "http://127.0.0.1:8080/meta/";

    console.debug("Listed for " + time + " seconds");

    $.ajax({
      url: metaUrl,
      headers: {
        'time': time,
        'userid': "59336e9002bd167dd80e4ad6"
      },
      success: function(res) {
        var
          artist = res["artist"],
          genre = res["null"],
          title = res["title"],
          album = res["album"],
          songId = res["songId"],
          coverUrl = fetchCoverArtUrl(artist, album);

          localStorage.setItem("songId", songId);

          $(e).attr("src", "http://127.0.0.1:8080/music/" + songId);
          $("#metainfo").children('h1').text(artist + " - " + title);
          $("#metainfo").children('h2').text(album);

          if (autoplay === true) e.play()

          // Play Event
          e.addEventListener('playing', function (e) {

            // Apply Cover Art
            // $.get(coverUrl, function (res) {
            //   if (res.album && res.album.image[3]) {
            //     $("#coverArt").attr("src", res.album.image[3]["#text"])
            //   }
            // });

            $("#playpause").removeClass("fa-play").addClass("fa-pause");
          });

      }
    });

    // Pause Event
    e.addEventListener('pause', function () {
      $("#playpause").removeClass("fa-pause").addClass("fa-play");
    }, false);

  };

  // Get CoverArt image url
  var fetchCoverArtUrl = function (artist, album) {
    var key = "f3023d6de1e35f28c7ebfcb369ed06f8";

    return "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + key + "&artist=" + artist + "&album=" + album + "&format=json";
  };

  $('#audio-player').mediaelementplayer({
    alwaysShowControls: true,
    features: ['playpause' ,'next', 'progress', 'fontawesome'],
    audioVolume: 'horizontal',
    audioWidth: 400,
    audioHeight: 120,

    success: function (e) {
      globals.player = e;
      play(e, localStorage.getItem("songId"));
    }

  });

  $('.mejs-next').bind('click', function (e) {
    var time = $("#audio-player")[0].currentTime;
    play(globals.player, true, time);
  });

});

