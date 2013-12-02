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
	playQueue.length = 0; 
	getMusicFromQuote(null);
}

function numberToPitch(number) {
	var pitch = null;
	switch(number) {
		case 0:
			pitch = "C";
			break;
		case 1:
			pitch = "C#";
			break;
		case 2:
			pitch = "D";
			break;
		case 3:
			pitch = "D#";
			break;
		case 4:
			pitch = "E";
			break;
		case 5:
			pitch = "F";
			break;
		case 6:
			pitch = "F#";
			break;
		case 7:
			pitch = "G";
			break;
		case 8:
			pitch = "G#";
			break;
		case 9:
			pitch = "A";
			break;
		case 10:
			pitch = "A#";
			break;
		case 11:
			pitch = "B";
			break;
		default:
			break;
	}
	return pitch;
}

function getMusicFromQuote(ticker) {
	$.ajax({
		url : "./ajax/getQuote.php",
		data : {ticker : ticker},
		dataType : "json",
		success : function(data) {
			console.log("data : " + data);
			if (data.code == 200) {
				playQueue = data.response.music;
				console.log("playQueue = " + playQueue);
				
				$("#number").html(data.response.number);
				$("#hash").html(data.response.hash);
				$("#base12").html(data.response.base12);

				var pitches = [];
				for(var i=0; i<data.response.music.length; i++) {
					console.log(data.response.music[i]);
					pitches.push(numberToPitch(data.response.music[i]));
				}
				$("#pitches").html(pitches.join(", "));

				playPitch();
			}
		}
  });
}

$(function() {
  $("canvas").remove();

  $("#get-quote-button").on("click", getRandomMusic);
});
