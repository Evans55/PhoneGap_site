// JavaScript Document

function onBodyLoad(){
document.addEventListener("deviceready", onDeviceReady, false);	
}

function onDeviceReady(){
$("#resultado").html("PhoneGap está en marcha");	

navigator.accelerometer.getCurrentAcceleration(onInfo,onError);
}


function onInfo(acceleration){
$("#resultado")	.append('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
	
}

function onError() {
    alert('No hay acelerómetro');
};