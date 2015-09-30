function getRaceEvent(lat, lon){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("txtMessage").innerHTML = xmlhttp.responseText;
            }
        }
        //event_id.addEventListener("change", showMessage());
        xmlhttp.open("GET", 'http://dispatch.nasasafety.com/trackflag/geteventajax.php?lat='+lat.toString()+'&lon='+lon.toString(), true);
        xmlhttp.send();
}

function clearLogo(){
    document.getElementById("divlogo").innerHTML = "";
}

function clearMessage(){
    document.getElementById("txtMessage").innerHTML = "";
}

function showMessage() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    document.getElementById("runscript").innerHTML = xmlhttp.responseText;
                }
            }
            var url = 'http://dispatch.nasasafety.com/trackflag/statusajax.php?event_id=' + document.getElementById('event_id').value.toString();
            xmlhttp.open("GET", url, true);
            xmlhttp.send();

        randomrefresh = 2 * 1000;
        setTimeout(showMessage, randomrefresh );
}

function checkforCommand() {
			if ( document.getElementById("runscript").innerHTML != "" ) {
			 		eval(document.getElementById("runscript").innerHTML);
					document.getElementById("runscript").innerHTML = '';
			}
       randomrefresh = 2 * 1000;
       setTimeout(checkforCommand, randomrefresh );
}

function getLocation() {

		navigator.geolocation.getCurrentPosition(gotLocation, noLocation);
	}
function noLocation(){
	 alert('no GPS available');
}

function gotLocation(position){
		lat =  position.coords.latitude;
		lon =  position.coords.longitude;

		getRaceEvent(lat, lon);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


function hideWavingYellow(){
    document.getElementById("WavingYellow").style.display = "none";
}

function showWavingYellow(){
    document.getElementById("WavingYellow").style.display = "block";
}

function hideRedFlag(){
    document.getElementById("divRedFlag").style.display = "none";
}

function showRedFlag(){
    document.getElementById("divRedFlag").style.display = "block";
}

function hideGreenFlag(){
    document.getElementById("divGreenFlag").style.display = "none";
}

function showGreenFlag(){
    document.getElementById("divGreenFlag").style.display = "block";
}

function hideWhiteFlag(){
    document.getElementById("divWhiteFlag").style.display = "none";
}

function showWhiteFlag(){
    document.getElementById("divWhiteFlag").style.display = "block";
}

function hideBlackFlag(){
    document.getElementById("divBlackFlag").style.display = "none";
}

function showBlackFlag(){
    document.getElementById("divBlackFlag").style.display = "block";
}

function hideSafetyFlag(){
    document.getElementById("divSafetyFlag").style.display = "none";
}

function showSafetyFlag(){
    document.getElementById("divSafetyFlag").style.display = "block";
}

function hideDebrisFlag(){
    document.getElementById("divDebrisFlag").style.display = "none";
}

function showDebrisFlag(){
    document.getElementById("divDebrisFlag").style.display = "block";
}

function hideRestartFlag(){
    document.getElementById("divRestartFlag").style.display = "none";
}

function showRestartFlag(){
    document.getElementById("divRestartFlag").style.display = "block";
}

function blinkWavingYellow(){
    if(window.getComputedStyle(document.getElementById("dblyellowCanvasLeft")).visibility == 'visible'){
        document.getElementById("dblyellowCanvasLeft").style.visibility = "hidden";
        document.getElementById("dblyellowCanvasRight").style.visibility = "visible";
    }else{
        document.getElementById("dblyellowCanvasLeft").style.visibility = "visible";
        document.getElementById("dblyellowCanvasRight").style.visibility = "hidden";
    }
    setTimeout(blinkWavingYellow, 500 );
}


