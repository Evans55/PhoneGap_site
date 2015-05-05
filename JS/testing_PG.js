// JavaScript Document

function onBodyLoad(){
document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
	
	playAudio('file:///android_asset/www/audio/Ellie Goulding-Outside.mp3');
}

// Audio player
        //
        var my_media = null;
        var mediaTimer = null;
	

        // Play audio
        //
        function playAudio(src) {
		
	var path = window.location.pathname;
    path = path.substr( path, path.length - 10 );
    absolutePath='file://' + path;
	//alert(absolutePath);
	
	/*if (device.platform == 'Android'){
     src='/android_asset/'+src;
 }*/
			
            // Create Media object from src
      if (my_media == null) {  my_media = new Media(src, onSuccess, onError); }
      else{ my_media.release(); my_media = new Media(src, onSuccess, onError);}
            // Play audio
            my_media.play();


            // Update my_media position every second
            if (mediaTimer == null) {
                mediaTimer = setInterval(function() {
                    // get my_media position
                    my_media.getCurrentPosition(
                        // success callback
                        function(position) {
                            if (position > -1) {
                                setAudioPosition((position) + " sec");
                            }
																				
                        },
                        // error callback
                        function(e) {
                            console.log("Error getting pos=" + e);
                            setAudioPosition("Error: " + e);
                        }
                    );
                }, 1000);
            }
			
        }

        // Pause audio
        //
        function pauseAudio() {
			
            if (my_media) {
                my_media.pause();
				
            }
			
        }

        // Stop audio
        //
        function stopAudio() {
            if (my_media) {
                my_media.stop();
            }
            clearInterval(mediaTimer);
            mediaTimer = null;
        }

        // onSuccess Callback
        //
        function onSuccess() {
            console.log("playAudio():Audio Success");
			my_media.release();
        }

        // onError Callback
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

        // Set audio position
        //
		
        function setAudioPosition(position) {
            document.getElementById('resultadoAudio').innerHTML = position;
        }



/* ACELELOMETRO
function onDeviceReady(){
	
$("#resultado").html("PhoneGap está en marcha");	

//navigator.accelerometer.getCurrentAcceleration(onInfo,onError);

var watch=navigator.accelerometer.watchAcceleration(onInfo,onError,{frequency:2000});

//navigator.accelerometer.clearWatch(watch);



}*/


function onInfo(acceleration){
$("#resultado")	.html(' Acceleration X: ' + acceleration.x + '<br>' +
          'Acceleration Y: ' + acceleration.y + '<br>' +
          'Acceleration Z: ' + acceleration.z + '<br>' +
          'Timestamp: '      + acceleration.timestamp + '<br>');
	
}

function onError() {
    alert('No hay acelerómetro');
};


function notificaciones(){
$("#resultado2").html("Área de notificaciones");	

$("#b_alerta").bind("tap", function(){
	navigator.notification.alert("Esto es una alerta", alertCallback, "Alerta!", "ciérrame");	
});

$("#b_confirmacion").bind("tap", function(){
	navigator.notification.confirm("Esto es una confirmación", confirmCallback, "Confirmación", ["Si","No"])
});

$("#b_prompt").bind("tap", function(){
	navigator.notification.prompt("Esto es un prompt", promptCallback, "Prompt", ["Si","Cancelar"], "Tu dirás...")
});

$("#b_ruido").bind("tap", function(){
	navigator.notification.beep(2);	
	navigator.notification.vibrate(1000);	
});


}


function alertCallback(){
	$("#resultado2").append("La alerta se ha cerrado<br>");	
}

function confirmCallback(buttonIndex){
	$("#resultado2").append("Ha habido una confirmación y han pulsado el botón " + buttonIndex + "<br>");	
}

function promptCallback(buttonIndex, input){
	$("#resultado2").append("Ha habido un prompt y han pulsado el botón " + buttonIndex + " han escrito" + input + "<br>");	
}



function capturas(){
	
$("#b_captura").bind("tap", function() {
navigator.device.capture.captureImage(captureSuccess, CaptureError, {limit:1});	
/*navigator.device.capture.supportedImageModes
	
navigator.device.capture.captureAudio(captureSuccess, CaptureError, {limit:2});
navigator.device.capture.supportedAudioModes

navigator.device.capture.captureVide(captureSuccess, CaptureError, {limit:2});
navigator.device.capture.supportedVideoModes*/

	
});
	
}


function captureSuccess(mediaFiles){
	var i, len;
	for(i=0, len=mediaFiles.length; i<len; i +=1){
		uploadFile(mediaFiles[i]);
	}
	
}


function uploadFile(mediaFile){
	var ft = new FileTransfer(),
	path = mediaFile.fullPath,
	name = mediaFile.name;	
	
	ft.upload(path,
	"http://my.domain.com/upload.php",
	function(result){
		console.log('Upload success: ' + result.responseCode);
		console.log(result.bytesSent + ' bytes sent');
	},
	function(error){
		console.log('Error uploading file' + path + ': ' + error.code);
	},
	{ fileName: name});
	
}



function geo(){
	
	$("#resultado3").html("esperando el GPS");
	var watch = navigator.geolocation.watchPosition(onInfo2, onError2, { timeout: 30000});
	
	}


function onInfo2(info){
	$("#resultado3").html('Latitud: '  +  info.coords.latitude + '<br>' + 
	'Longitud: '  +  info.coords.longitude + '<br>' + 
	'Altitud: '  +  info.coords.altitude + '<br>' + 
	'Accuracy: '  +  info.coords.accuracy + '<br>' + 
	'Altitud Accuracy: '  +  info.coords.altitudeAccuracy + '<br>' + 
	'Heading: '  +  info.coords.heading + '<br>' + 
	'Speed: '  +  info.coords.speed + '<br>' + 
	'Timestamp: '  +  info.coords.timestamp + '<br>'
	);
	
}

function onError2(){
	$("#resultado3").html('code: ' + error.code + '<br>'  +  'message: ' + error.message);
}

