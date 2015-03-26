// JavaScript Document

function onBodyLoad(){
document.addEventListener("deviceready", audio, false);	
}

/*
function onDeviceReady(){
	
	
}*/


function audio(e){
	
	$("#b_playAudio").bind("tap", function() {
		e.preventDefault();
		e.stopImmediatePropagation();
		$("#resultadoAudio").html("Pidiendo audio");
		playAudio("Ellie Goulding-Outside.mp3");
	});
	
	$("#b_stopAudio").bind("tap" , function(){
		e.preventDefault();
		e.stopImmediatePropagation();
		stopAudio();
	});
}

var my_media = null;
var mediaTimer = null;



function playAudio(src){
if(my_media==null){
my_media = new Media(src, onSuccess, onError);	
}
my_media.play();

if(mediaTimer == null) {
    mediaTimer = setInterval(function(){
	my_media.getCurrentPosition(
	function(position) {
	   if(position > -1){
	      $("#resultadoAudio").html("Pos = " + position);
		  }
	   },
	function(e){
      $("#resultadoAudio").html("Error = " + e);
	  setAudioPosition("Error: " + e);
	  	}
     );
}, 1000);
}
	
}


function stopAudio(){
if(my_media)	{
my_media.stop();	
}
}

function onSuccess(){
$("#resultadoAudio").html("playAudio():Audio Success");	
}

function onError(error){
	$("#resultadoAudio").html('code: '   + error.code  +  '<br>' + 'message: ' + error.message + '\n');
}


