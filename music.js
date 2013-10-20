//var playQueue = [];
var playQueue = [0,2,4,5,7,9,11,12]; 	// C-Major Scale

function play(i) {
	$keys.trigger("note-"+i+".play");
}

function playCScale() {
  playQueue = [0,2,4,5,7,9,11,12]; 	// C-Major Scale
  playPitch();
}

var playingPitch = false;
function playPitch() {
	var time;
	console.log("in play pitch");

	if (playQueue.length == 0) {
		playingPitch = false;
		return;
	}
	playingPitch = true;

	var pitch = playQueue.shift();

	play(pitch);
	time = Math.random() * 300 + 100;
	setTimeout(playPitch, time);
}

function getRandomMusic() {
	getMusicFromQuote(null);
}

function getMusicFromQuote(ticker) {
	$.ajax({
		url : "./ajax/getQuote.php",
		data : {ticker : ticker},
		dataType : "json",
		success : function(data) {
			console.log("data : " + data);
			if (data.code == 200) {
				playQueue = data.response;
				console.log("playQueue = " + playQueue);
				playPitch();
			}
		}
  });
}

$(function() {
  $("canvas").remove();

  $("#get-quote-button").on("click", getRandomMusic);
});
