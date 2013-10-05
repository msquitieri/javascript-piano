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

	if (playQueue.length == 0) {
		playingPitch = false;
		return;
	}
	playingPitch = true;

	var pitch = playQueue.shift();

	play(pitch);
	setTimeout(playPitch, 300);
}

function getMusicFromQuote(ticker) {
	$.ajax({
		url : "./ajax/getQuote.php",
		data : {ticker : ticker},
		success : function(data) {
			if (data.code == 200) {
				playQueue = data.response;
				playPitch();
			}
		}
  });
}

$(function() {
  $("canvas").remove();
});
