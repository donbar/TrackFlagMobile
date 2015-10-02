var wavingyellowTimeout;
var geteventtimeout;
function getRaceEvent(lat, lon){
        var xmlhttpevent = new XMLHttpRequest();
        xmlhttpevent.onreadystatechange = function() {
            if (xmlhttpevent.readyState == 4 && xmlhttpevent.status == 200) {
                document.getElementById("lostconnection").style.display = "none";
                document.getElementById("txtMessage").innerHTML = xmlhttpevent.responseText;
                clearTimeout(geteventtimeout);
            }else if((xmlhttpevent.status == 0 || xmlhttpevent.status == 404) && xmlhttpevent.readyState == 4){
                // lost connection with server, clear screen and show oopsies div
                document.getElementById("lostconnection").style.display = "inline-block";
                randomrefresh = 2 * 1000;
                geteventtimeout = setTimeout(getRaceEvent, randomrefresh, lat, lon );
            }

        }
        xmlhttpevent.open("GET", 'http://dispatch.nasasafety.com/trackflag/geteventajax.php?lat='+lat.toString()+'&lon='+lon.toString(), true);
        xmlhttpevent.send();
}

function clearLogo(){
    document.getElementById("divlogo").innerHTML = "";
    document.getElementById("container").style.backgroundColor = "#c0c0c0";
    document.getElementById("globalflags").style.backgroundColor = "#c0c0c0";
    document.getElementById("localflags").style.backgroundColor = "#c0c0c0";
}

function clearMessage(){
    document.getElementById("txtMessage").innerHTML = "";
}

function getGlobalCommand() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    document.getElementById("lostconnection").style.display = "none";
                    document.getElementById("runscript").innerHTML = xmlhttp.responseText;
                }else if((xmlhttp.status == 0 || xmlhttp.status == 404) && xmlhttp.readyState == 4){
                    // lost connection with server, clear screen and show oopsies div
                    hideDoubleYellowFlag();
                    hideSafetyFlag();
                    hideGreenFlag();
                    hideRestartFlag();
                    hideRedFlag();
                    hideWhiteFlag();
                    hideBlackFlag();
                    hideStandingYellowFlag();
                    hideDebrisFlag();
                    hidewavingYellow();
                    document.getElementById("lostconnection").style.display = "inline-block";
                }
            }
            var url = 'http://dispatch.nasasafety.com/trackflag/statusajax.php?event_id=' + document.getElementById('event_id').value.toString();
            xmlhttp.open("GET", url, true);
            xmlhttp.send();

        randomrefresh = 2 * 1000;
        setTimeout(getGlobalCommand, randomrefresh );
}

function checkforGlobalCommand() {

			if ( document.getElementById("runscript").innerHTML != "" ) {
			 		eval(document.getElementById("runscript").innerHTML);
					document.getElementById("runscript").innerHTML = '';
			}
       randomrefresh = 500;
       setTimeout(checkforGlobalCommand, randomrefresh );
}

function getLocation() {

		navigator.geolocation.getCurrentPosition(gotLocation, noLocation);
	}
function noLocation(){
	 // do nothing;
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


function hideRedFlag(){
    document.getElementById("redFlag").style.display = "none";
}

function showRedFlag(scale){
    document.getElementById("redFlag").style.display = "inline-block";

    var canvas = document.getElementById('redFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('globalflags').clientHeight;   
    var clientWidth = document.getElementById('globalflags').clientWidth * (1 / scale) - 2;

    // resize the canvas
    canvas.height = clientHeight;
    canvas.width = clientWidth;

    context.beginPath();
    context.rect(0, 0, clientWidth, clientHeight);
    context.fillStyle = 'red';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();


    var textString = 'RED';
    var fontsize = (clientWidth/textString.length);
    var divisor = '1.'+textString.length.toString();
    var textheight = (clientHeight / divisor);

    var ctx = canvas.getContext("2d");
    ctx.font=fontsize.toString()+"px Verdana";
    context.fillStyle = 'white';
    textWidth = ctx.measureText(textString ).width;
    ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), textheight);
}


function hideDoubleYellowFlag(){
    document.getElementById("doubleyellowFlag").style.display = "none";
}

function showDoubleYellowFlag(scale){
    document.getElementById("doubleyellowFlag").style.display = "inline-block";

    var canvas = document.getElementById('doubleyellowFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('globalflags').clientHeight;   
    var clientWidth = document.getElementById('globalflags').clientWidth * (1 / scale) - 2;

    // resize the canvas
    canvas.height = clientHeight;
    canvas.width = clientWidth;

    context.beginPath();
    context.rect(0, 0, clientWidth, clientHeight);
    context.fillStyle = 'yellow';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();


    var textString = 'YELLOW';
    var fontsize = (clientWidth/textString.length);
    var divisor = '1.'+textString.length.toString();
    var textheight = (clientHeight / divisor);

    var ctx = canvas.getContext("2d");
    ctx.font=fontsize.toString()+"px Verdana";
    context.fillStyle = 'black';
    textWidth = ctx.measureText(textString ).width;
    ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), textheight);
}


function hideGreenFlag(){
    document.getElementById("greenFlag").style.display = "none";
}

function showGreenFlag(scale){
    document.getElementById("greenFlag").style.display = "inline-block";

    var canvas = document.getElementById('greenFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('globalflags').clientHeight;   
    var clientWidth = document.getElementById('globalflags').clientWidth * (1 / scale) - 2;

    // resize the canvas
    canvas.height = clientHeight;
    canvas.width = clientWidth;

    context.beginPath();
    context.rect(0, 0, clientWidth, clientHeight);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();


    var textString = 'GREEN';
    var fontsize = (clientWidth/textString.length);
    var divisor = '1.'+textString.length.toString();
    var textheight = (clientHeight / divisor);

    var ctx = canvas.getContext("2d");
    ctx.font=fontsize.toString()+"px Verdana";
    context.fillStyle = 'white';
    textWidth = ctx.measureText(textString ).width;
    ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), textheight);
}

function hideWhiteFlag(){
    document.getElementById("whiteFlag").style.display = "none";
}

function showWhiteFlag(scale){
    document.getElementById("whiteFlag").style.display = "inline-block";

    var canvas = document.getElementById('whiteFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('globalflags').clientHeight;   
    var clientWidth = document.getElementById('globalflags').clientWidth * (1 / scale) - 2;

    // resize the canvas
    canvas.height = clientHeight;
    canvas.width = clientWidth;

    context.beginPath();
    context.rect(0, 0, clientWidth, clientHeight);
    context.fillStyle = 'white';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();

    var textString = 'WHITE';
    var fontsize = (clientWidth/textString.length);
    var divisor = '1.'+textString.length.toString();
    var textheight = (clientHeight / divisor);

    var ctx = canvas.getContext("2d");
    ctx.font=fontsize.toString()+"px Verdana";
    context.fillStyle = 'black';
    textWidth = ctx.measureText(textString ).width;
    ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), textheight);

}

function hideBlackFlag(){
    document.getElementById("blackFlag").style.display = "none";
}

function showBlackFlag(scale){
    document.getElementById("blackFlag").style.display = "inline-block";

    var canvas = document.getElementById('blackFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('globalflags').clientHeight;   
    var clientWidth = document.getElementById('globalflags').clientWidth * (1 / scale) - 2;

    // resize the canvas
    canvas.height = clientHeight;
    canvas.width = clientWidth;

    context.beginPath();
    context.rect(0, 0, clientWidth, clientHeight);
    context.fillStyle = 'black';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();


    var textString = 'BLACK';
    var fontsize = (clientWidth/textString.length);
    var divisor = '1.'+textString.length.toString();
    var textheight = (clientHeight / divisor);

    var ctx = canvas.getContext("2d");
    ctx.font=fontsize.toString()+"px Verdana";
    context.fillStyle = 'white';
    textWidth = ctx.measureText(textString ).width;
    ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), textheight);

}

function hideSafetyFlag(){
    document.getElementById("safetyFlag").style.display = "none";
}

function showSafetyFlag(scale){
    document.getElementById("safetyFlag").style.display = "inline-block";

    var canvas = document.getElementById('safetyFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('globalflags').clientHeight;   
    var clientWidth = document.getElementById('globalflags').clientWidth * (1 / scale) - 2;

    // resize the canvas
    canvas.height = clientHeight;
    canvas.width = clientWidth;

    context.beginPath();
    context.rect(0, 0, clientWidth, clientHeight);
    context.fillStyle = 'white';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();

    var c=document.getElementById("safetyFlag");
    var ctx=c.getContext("2d");
    ctx.fillStyle = 'red';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    var barwidth = clientWidth * .05;
    ctx.fillRect(clientWidth/2 - (barwidth/2),0,barwidth,clientHeight);

    // Red Cross for Safety flag
    var c=document.getElementById("safetyFlag");
    var ctx=c.getContext("2d");
    ctx.fillStyle = 'red';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.fillRect(0,clientHeight/2 - (barwidth/2),clientWidth,barwidth);

    
    var textString = 'SAFETY';
    var fontsize = (clientWidth/textString.length);
    var divisor = '1.'+textString.length.toString();
    var textheight = (clientHeight / divisor);

    var ctx = canvas.getContext("2d");
    ctx.font= fontsize.toString()+"px Verdana";
    context.fillStyle = 'black';
    textWidth = ctx.measureText(textString ).width;
    ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), textheight);
}


function hideRestartFlag(){
    document.getElementById("restartFlag").style.display = "none";
}

function showRestartFlag(scale){
    document.getElementById("restartFlag").style.display = "inline-block";

    var canvas = document.getElementById('restartFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('globalflags').clientHeight;   
    var clientWidth = document.getElementById('globalflags').clientWidth * (1 / scale) - 2;

    // resize the canvas
    canvas.height = clientHeight;
    canvas.width = clientWidth;

    context.beginPath();
    context.rect(0, 0, clientWidth/2, clientHeight);
    context.fillStyle = 'red';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();

    context.beginPath();
    context.rect(clientWidth/2, 0, clientWidth/2, clientHeight);
    context.fillStyle = 'yellow';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();    

    var textString = 'RESTART';
    var fontsize = (clientWidth/textString.length);
    var divisor = '1.'+textString.length.toString();
    var textheight = (clientHeight / divisor);

    var ctx = canvas.getContext("2d");
    ctx.font=fontsize.toString()+"px Verdana";
    context.fillStyle = 'black';
    textWidth = ctx.measureText(textString ).width;
    ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), textheight);

}

// Local Flags
function hideStandingYellowFlag(){
    document.getElementById("standingYellow").style.display = "none";
}

function showStandingYellowFlag(turn, scale){
    document.getElementById("standingYellow").style.display = "inline-block";

	var canvas = document.getElementById('standingYellow');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('localflags').clientHeight;   
    var clientWidth = document.getElementById('localflags').clientWidth * (1 / scale) - 2;

    // resize the canvas
    canvas.height = clientHeight;
    canvas.width = clientWidth;

    context.beginPath();
    context.rect(0, 0, clientWidth, clientHeight);
    context.fillStyle = 'yellow';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();

    
	if ( turn ) {
   		var textString = turn;
        var fontsize = (clientWidth/textString.length);
        var divisor = '1.'+textString.length.toString();
        var textheight = (clientHeight / divisor);
        var texty = clientHeight;

		var ctx = canvas.getContext("2d");
		ctx.font=fontsize.toString()+"px Verdana";
		context.fillStyle = 'black';
	    textWidth = ctx.measureText(textString ).width;
		ctx.fillText(textString , (clientWidth/2) - (textWidth / 2),clientHeight);
	}


}

function hideDebrisFlag(scale){
    document.getElementById("debrisFlag").style.display = "none";

}

function showDebrisFlag(turn, scale){
    var canvas = document.getElementById('debrisFlag');
    var context = canvas.getContext('2d');

    document.getElementById("debrisFlag").style.display = "inline-block";

    var canvas = document.getElementById('debrisFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('localflags').clientHeight;   
    var clientWidth = document.getElementById('localflags').clientWidth * (1 / scale) - 2;


    // resize the canvas
    canvas.height = clientHeight;
    canvas.width = clientWidth;

    var barwidth = clientWidth / 10;

    context.beginPath();
    context.rect(0, 0, clientWidth, clientHeight);
    context.fillStyle = 'yellow';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'red';
    context.stroke();

    var c=document.getElementById("debrisFlag");
    var ctx=c.getContext("2d");
    ctx.fillStyle = 'red';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.fillRect(barwidth,0,barwidth,clientHeight);

    var ctx=c.getContext("2d");
    ctx.fillStyle = 'red';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.fillRect(barwidth * 3,0,barwidth,clientHeight);

    var ctx=c.getContext("2d");
    ctx.fillStyle = 'red';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.fillRect(barwidth * 5,0,barwidth,clientHeight);

    var ctx=c.getContext("2d");
    ctx.fillStyle = 'red';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.fillRect(barwidth * 7,0,barwidth,clientHeight);

    var ctx=c.getContext("2d");
    ctx.fillStyle = 'red';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.fillRect(barwidth * 9,0,barwidth,clientHeight);

    
    if ( turn ) {
            var textheight = (clientHeight / 1.2);
            var textString = turn;
            var ctx = c.getContext("2d");
            ctx.font= textheight.toString()+"px Verdana";
            context.fillStyle = 'black';
            textWidth = ctx.measureText(textString ).width;
            ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), clientHeight);
    }

}

function hidewavingYellow(scale){
    document.getElementById("wavingYellow").style.display = "none";
    var canvas = document.getElementById('wavingYellow');
    ctx = canvas.getContext('2d');
    var clientHeight = document.getElementById('localflags').clientHeight;   
    var clientWidth = document.getElementById('localflags').clientWidth * (1 / scale) - 2;
    ctx.clearRect(0, 0, clientWidth, clientHeight);
    clearTimeout(wavingyellowTimeout);
}

function showwavingYellow(turn, scale){
    if (document.getElementById("wavingYellow").style.display == "none"){
        document.getElementById("wavingYellow").style.display = "inline-block";
        blinkwavingYellow(turn, scale, 1);
    }
}

function blinkwavingYellow(turn, scale, even){
        if (even == 1)
            {
               even = 0;
                var canvas = document.getElementById('wavingYellow');
                var context = canvas.getContext('2d');

                var clientHeight = document.getElementById('localflags').clientHeight;   
                var clientWidth = document.getElementById('localflags').clientWidth * (1 / scale) - 2;

                // resize the canvas
                canvas.height = clientHeight;
                canvas.width = clientWidth;

                var fillcolor;
                var othercolor;
                fillcolor = 'yellow';
                othercolor = '#c0c0c0';


                context.beginPath();
                context.clearRect(0, 0, clientWidth/2, clientHeight);
                context.rect(0, 0, clientWidth/2, clientHeight);
                context.fillStyle = fillcolor;
                context.fill();
                context.lineWidth = 1;
                context.strokeStyle = 'black';
                context.stroke();

                context.beginPath();
                context.clearRect(clientWidth/2, 0, clientWidth/2, clientHeight);
                context.rect(clientWidth/2, 0, clientWidth/2, clientHeight);
                context.fillStyle = othercolor;
                context.fill();
                context.lineWidth = 1;
                context.strokeStyle = 'black';
                context.stroke();    

                if ( turn ) {
                        var textheight = (clientHeight / 1.2);
                        var textString = turn;
                        var ctx = canvas.getContext("2d");
                        ctx.font= textheight.toString()+"px Verdana";
                        context.fillStyle = 'black';
                        textWidth = ctx.measureText(textString ).width;
                        ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), clientHeight);
                }                

            } else{
                even = 1;
                var canvas = document.getElementById('wavingYellow');
                var context = canvas.getContext('2d');//

                var clientHeight = document.getElementById('localflags').clientHeight;   
                var clientWidth = document.getElementById('localflags').clientWidth * (1 / scale) - 2;

                // resize the canvas
                canvas.height = clientHeight;
                canvas.width = clientWidth;

                var fillcolor;
                var othercolor;
                fillcolor = '#c0c0c0';
                othercolor = 'yellow';


                context.beginPath();
                context.clearRect(0, 0, clientWidth/2, clientHeight);
                context.rect(0, 0, clientWidth/2, clientHeight);
                context.fillStyle = fillcolor;
                context.fill();
                context.lineWidth = 1;
                context.strokeStyle = 'black';
                context.stroke();

                context.beginPath();
                context.clearRect(clientWidth/2, 0, clientWidth/2, clientHeight);
                context.rect(clientWidth/2, 0, clientWidth/2, clientHeight);
                context.fillStyle = othercolor;
                context.fill();
                context.lineWidth = 1;
                context.strokeStyle = 'black';
                context.stroke();

                if ( turn ) {
                        var textheight = (clientHeight / 1.2);
                        var textString = turn;
                        var ctx = canvas.getContext("2d");
                        ctx.font= textheight.toString()+"px Verdana";
                        context.fillStyle = 'black';
                        textWidth = ctx.measureText(textString ).width;
                        ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), clientHeight);
                }                    
            }
            
randomrefresh = 500;
wavingyellowTimeout = setTimeout(blinkwavingYellow, randomrefresh, turn, scale, even);    
        
}
