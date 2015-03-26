// JavaScript Document

function onBodyLoad(){
document.addEventListener("deviceready", onDeviceReady, false);	
}

function onDeviceReady(){
$("#resultado").html("PhoneGap está en marcha");	

//navigator.accelerometer.getCurrentAcceleration(onInfo,onError);

var watch=navigator.accelerometer.watchAcceleration(onInfo,onError,{frequency:2000});

//navigator.accelerometer.clearWatch(watch);



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


function notificaciones(){
$("#resultado2").html("Área de notificaciones");	

$("#b_alerta").bind("tap", function(){
	navigator.notification.alert("Esto es una alerta", alertCallback, "Alerta!", "ciérrame");	
});

$("#b_confirmacion").bind("tap", function(){
	navigator.notification.confirm("Esto es una confirmación", confirmCallback, "Confirmación", ["Si","No"]);	
});

$("#b_prompt").bind("tap", function(){
	navigator.notification.prompt("Esto es un prompt", promptCallback, "Prompt", ["Si","Cancelar"], "Tu dirás...");
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
