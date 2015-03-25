// JavaScript Document

function onBodyLoad(){
document.addEventListener("deviceready", onDeviceReady, false);	
}

function onDeviceReady(){
$("#resultado").html("PhoneGap está en marcha");	

//navigator.accelerometer.getCurrentAcceleration(onInfo,onError);

var watch=navigator.accelerometer.watchAcceleration(onInfo,onError,{frequency:2000});

}


function onInfo(acceleration){
$("#resultado")	.html(' Acceleration X: ' + acceleration.x + '<br>' +
          'Acceleration Y: ' + acceleration.y + '<br>' +
          'Acceleration Z: ' + acceleration.z + '<br>' +
          'Timestamp: '      + acceleration.timestamp + '<br>');
	
}

function onError() {
    alert('No hay acelerómetro');
};