var wavingyellowTimeout;
var geteventtimeout;



/*
$ionicPlatform.ready(function() {
   //Check the position with $cordovaGeolocation. This one is just a function
    checkPosition();
});
*/

function getConfig(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            eval(xmlhttp.responseText);
            
        }else if((xmlhttp.status == 0 || xmlhttp.status == 404) && xmlhttp.readyState == 4){
            // lost connection with server, clear screen and show oopsies div
            
        }
    }
    var url = 'https://trackflag.nasasafety.com/server/configajax.php?event_id=' + document.getElementById('event_id').value.toString();
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function checkPosition(){
     var startPos;
     navigator.geolocation.getCurrentPosition(function(position) {
        startPos = position;

        var d = new Date();
        var t = d.getTime();
       

        var hour = d.getHours();
        var min = d.getMinutes();
        var sec = d.getSeconds();


        hour = (hour > 12 ? hour - 12: hour);
        hour = (hour < 10 ? "0" : "") + hour;        
        min = (min < 10 ? "0" : "") + min;
        sec = (sec < 10 ? "0" : "") + sec;

        document.getElementById('localtime').value = hour + ':'+min+':'+sec;


        // If we haven't moved and an event has been selected; check.
        // If no event selected, ignore this stuff.
        if (document.getElementById('startLat').value == startPos.coords.latitude.toFixed(4)
            && document.getElementById('startLon').value == startPos.coords.longitude.toFixed(4)
            && document.getElementById('event_id').value != ''
            && document.getElementById("controlmessages").value != 0){
                // car hasn't moved, been 10 seconds yet?
                // someday we'll add GPS for paddock/pre-grid here
                if (document.getElementById('geotime').value + 10 > t){
                    //show text messages
                    document.getElementById('container').className='hidecontainer';
                    document.getElementById('messagesfromcontrol').className='showmessages';
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function() {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            //document.getElementById("lostconnection").style.display = "none";
                            
                            document.getElementById('messagesfromcontrol').innerHTML = xmlhttp.responseText;
                            
                        }else if((xmlhttp.status == 0 || xmlhttp.status == 404) && xmlhttp.readyState == 4){
                            // lost connection with server, clear screen and show oopsies div
                            document.getElementById('messagesfromcontrol').innerHTML = 'Connection lost...';
                        }
                    }
                    var url = 'https://trackflag.nasasafety.com/server/controlmessageajax.php?event_id=' + document.getElementById('event_id').value.toString();
                    xmlhttp.open("GET", url, true);
                    xmlhttp.send();
                }
        }else{
            //position has changed, so update time
            document.getElementById('geotime').value = t;
            document.getElementById('controlmessages').className='hidemessages';
            document.getElementById('container').className='container';
            // and show flags

        }

        // update position regardless of what happened above
        document.getElementById('startLat').value = startPos.coords.latitude.toFixed(4);
        document.getElementById('startLon').value = startPos.coords.longitude.toFixed(4);


        setTimeout(checkPosition, 3000);

    }, function(error) {
        if (error.code == 1){
            alert('GPS permission denied.  You will not see messages, only flags.');
        }else if (error.code == 2){
            alert('GPS data not available.  You will not see messages, only flags.');
        }else if (error.code == 3){
            alert('Timed out retrieving GPS data.  You will not see messages, only flags.');
        }else{
            alert('Unable to obtain GPS data.  You will not see messages, only flags.');
        }
     });
}

function getRaceEvent(){
        var xmlhttpevent = new XMLHttpRequest();
        xmlhttpevent.onreadystatechange = function() {
            if (xmlhttpevent.readyState == 4 && xmlhttpevent.status == 200) {
                //document.getElementById("lostconnection").style.display = "none";
                document.getElementById("txtMessage").innerHTML = xmlhttpevent.responseText;
                clearTimeout(geteventtimeout);
            }else if((xmlhttpevent.status == 0 || xmlhttpevent.status == 404) && xmlhttpevent.readyState == 4){
                // lost connection with server, clear screen and show oopsies div
                //document.getElementById("lostconnection").style.display = "inline-block";
                randomrefresh = 2 * 1000;
                geteventtimeout = setTimeout(getRaceEvent, randomrefresh, lat, lon );
            }

        }
        xmlhttpevent.open("GET", 'https://trackflag.nasasafety.com/server/geteventajax.php', true);
        xmlhttpevent.send();
}

function clearLogo(){
    document.getElementById("divlogo").innerHTML = "";
    document.getElementById("container").style.backgroundColor = "#c0c0c0";
    document.getElementById("globalflags").style.backgroundColor = "#c0c0c0";
    document.getElementById("localflags").style.backgroundColor = "#c0c0c0";
    document.getElementById("container").display = "none";
}

function clearMessage(){
    document.getElementById("txtMessage").innerHTML = "";
}


function getGlobalCommand() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    //document.getElementById("lostconnection").style.display = "none";
                    eval(xmlhttp.responseText);
                }else if((xmlhttp.status == 0 || xmlhttp.status == 404) && xmlhttp.readyState == 4){
                    // lost connection with server, clear screen and show oopsies div
                    hideDoubleYellowFlag();
                    hideSafetyFlag();
                    hideGreenFlag();
                    hideRestartFlag();
                    hideRedFlag();
                    hideWhiteFlag();
                    hideBlackFlag();
                    hideCheckeredFlag();
                    hideStandingYellowFlag();
                    hideDebrisFlag();
                    hideDownOilFlag();
                    hidewavingYellow();
                    //document.getElementById("lostconnection").style.display = "inline-block";
                }
            }
            var url = 'https://trackflag.nasasafety.com/server/statusajax.php?event_id=' + document.getElementById('event_id').value.toString();
            xmlhttp.open("GET", url, true);
            xmlhttp.send();

        randomrefresh = 500;
        setTimeout(getGlobalCommand, randomrefresh );
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
    var clientWidth = document.getElementById('globalflags').clientWidth * (1 / scale) - 10;

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


    var textString = '';
    var fontsize = (clientWidth/textString.length);
    var divisor = '1.'+textString.length.toString();
    var textheight = (clientHeight / divisor);

    var ctx = canvas.getContext("2d");
    ctx.font=fontsize.toString()+"px Verdana";
    context.fillStyle = 'white';
    textWidth = ctx.measureText(textString ).width;
    //ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), textheight);
}


function hideDoubleYellowFlag(){
    document.getElementById("doubleyellowFlag").style.display = "none";
}

function showDoubleYellowFlag(scale){
    document.getElementById("doubleyellowFlag").style.display = "inline-block";

    var canvas = document.getElementById('doubleyellowFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('globalflags').clientHeight;
    var clientWidth = document.getElementById('globalflags').clientWidth * (1 / scale) - 10;

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


    var textString = '';
    var fontsize = (clientWidth/textString.length);
    var divisor = '1.'+textString.length.toString();
    var textheight = (clientHeight / divisor);

    var ctx = canvas.getContext("2d");
    ctx.font=fontsize.toString()+"px Verdana";
    context.fillStyle = 'black';
    textWidth = ctx.measureText(textString ).width;
    //ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), textheight);
}



function hideGreenFlag(){
    document.getElementById("greenFlag").style.display = "none";
}

function showGreenFlag(scale){
    document.getElementById("greenFlag").style.display = "inline-block";

    var canvas = document.getElementById('greenFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('globalflags').clientHeight;
    var clientWidth = document.getElementById('globalflags').clientWidth * (1 / scale) - 10;

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


    var textString = '';
    var fontsize = (clientWidth/textString.length);
    var divisor = '1.'+textString.length.toString();
    var textheight = (clientHeight / divisor);

    var ctx = canvas.getContext("2d");
    ctx.font=fontsize.toString()+"px Verdana";
    context.fillStyle = 'white';
    textWidth = ctx.measureText(textString ).width;
    //ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), textheight);
}

function hideWhiteFlag(){
    document.getElementById("whiteFlag").style.display = "none";
}

function showWhiteFlag(scale){
    document.getElementById("whiteFlag").style.display = "inline-block";

    var canvas = document.getElementById('whiteFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('globalflags').clientHeight;
    var clientWidth = document.getElementById('globalflags').clientWidth * (1 / scale) - 10;

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

    var textString = '';
    var fontsize = (clientWidth/textString.length);
    var divisor = '1.'+textString.length.toString();
    var textheight = (clientHeight / divisor);

    var ctx = canvas.getContext("2d");
    ctx.font=fontsize.toString()+"px Verdana";
    context.fillStyle = 'black';
    textWidth = ctx.measureText(textString ).width;
    //ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), textheight);

}

function hideCheckeredFlag(){
    document.getElementById("checkeredFlag").style.display = "none";
}


function showCheckeredFlag(scale){
    document.getElementById("checkeredFlag").style.display = "inline-block";

    var canvas = document.getElementById('checkeredFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('globalflags').clientHeight;
    var clientWidth = document.getElementById('globalflags').clientWidth * (1 / scale) - 10;

    // resize the canvas
    canvas.height = clientHeight;
    canvas.width = clientWidth;

    canvas.style = 'checkered';
}

function hideBlackFlag(){
    document.getElementById("blackFlag").style.display = "none";
}


function showBlackFlag(scale){
    document.getElementById("blackFlag").style.display = "inline-block";

    var canvas = document.getElementById('blackFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('globalflags').clientHeight;
    var clientWidth = document.getElementById('globalflags').clientWidth * (1 / scale) - 10;

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


    var textString = '';
    var fontsize = (clientWidth/textString.length);
    var divisor = '1.'+textString.length.toString();
    var textheight = (clientHeight / divisor);

    var ctx = canvas.getContext("2d");
    ctx.font=fontsize.toString()+"px Verdana";
    context.fillStyle = 'white';
    textWidth = ctx.measureText(textString ).width;
    //ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), textheight);

}

function hideSafetyFlag(){
    document.getElementById("safetyFlag").style.display = "none";
}

function showSafetyFlag(scale){
    document.getElementById("safetyFlag").style.display = "inline-block";

    var canvas = document.getElementById('safetyFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('globalflags').clientHeight;
    var clientWidth = document.getElementById('globalflags').clientWidth * (1 / scale) - 10;

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


    var textString = '';
    var fontsize = (clientWidth/textString.length);
    var divisor = '1.'+textString.length.toString();
    var textheight = (clientHeight / divisor);

    var ctx = canvas.getContext("2d");
    ctx.font= fontsize.toString()+"px Verdana";
    context.fillStyle = 'black';
    textWidth = ctx.measureText(textString ).width;
    //ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), textheight);
}


function hideRestartFlag(){
    document.getElementById("restartFlag").style.display = "none";
}

function showRestartFlag(scale){
    document.getElementById("restartFlag").style.display = "inline-block";

    var canvas = document.getElementById('restartFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('globalflags').clientHeight;
    var clientWidth = document.getElementById('globalflags').clientWidth * (1 / scale) - 10;

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

    var textString = '';
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
    var clientWidth = document.getElementById('localflags').clientWidth * (1 / scale) - 10;

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
            var artificiallength = turn.length + 7;
            var divisor = '1.'+artificiallength.toString();
            var divisor = 2.4;            
            var textheight = (clientHeight / divisor);
            var textString = turn.trim();
            var ctx = canvas.getContext("2d");
            ctx.font= textheight.toString()+"px Verdana";
            context.fillStyle = 'black';
            textWidth = ctx.measureText(textString ).width;
            ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), (clientHeight) - (textheight/2));
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
    var clientWidth = document.getElementById('localflags').clientWidth * (1 / scale) - 10;


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

            var artificiallength = turn.length + 7;
            var divisor = '1.'+artificiallength.toString();
            var divisor = 2.4;            
            var textheight = (clientHeight / divisor);
            var textString = turn.trim();
            var ctx = c.getContext("2d");
            ctx.font= textheight.toString()+"px Verdana";
            context.fillStyle = 'black';
            textWidth = ctx.measureText(textString ).width;
            ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), (clientHeight) - (textheight/2));
    }

}


function hidewavingYellow(scale){
    document.getElementById("wavingYellow").style.display = "none";
    var canvas = document.getElementById('wavingYellow');
    ctx = canvas.getContext('2d');
    var clientHeight = document.getElementById('localflags').clientHeight;
    var clientWidth = document.getElementById('localflags').clientWidth * (1 / scale) - 10;
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
                var clientWidth = document.getElementById('localflags').clientWidth * (1 / scale) - 10;

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
                        var artificiallength = turn.length + 7;
                        var divisor = '1.'+artificiallength.toString();
                        var divisor = 2.4;            
                        var textheight = (clientHeight / divisor);
                        var textString = turn.trim();
                        var ctx = canvas.getContext("2d");
                        ctx.font= textheight.toString()+"px Verdana";
                        context.fillStyle = 'black';
                        textWidth = ctx.measureText(textString ).width;
                        ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), (clientHeight) - (textheight/2));
                }            

            } else{
                even = 1;
                var canvas = document.getElementById('wavingYellow');
                var context = canvas.getContext('2d');//

                var clientHeight = document.getElementById('localflags').clientHeight;   
                var clientWidth = document.getElementById('localflags').clientWidth * (1 / scale) - 10;

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
                        var artificiallength = turn.length + 7;
                        var divisor = '1.'+artificiallength.toString();
                        var divisor = 2.4;            
                        var textheight = (clientHeight / divisor);
                        var textString = turn;
                        var ctx = canvas.getContext("2d");
                        ctx.font= textheight.toString()+"px Verdana";
                        context.fillStyle = 'black';
                        textWidth = ctx.measureText(textString ).width;
                        ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), (clientHeight) - (textheight/2));
                }                 
            }
            
randomrefresh = 250;
wavingyellowTimeout = setTimeout(blinkwavingYellow, randomrefresh, turn, scale, even);    
        
}

function hideDownOilFlag(scale){
    document.getElementById("oilFlag").style.display = "none";

}

function showDownOilFlag(turn, scale){
    var canvas = document.getElementById('oilFlag');
    var context = canvas.getContext('2d');

    document.getElementById("oilFlag").style.display = "inline-block";

    var canvas = document.getElementById('oilFlag');
    var context = canvas.getContext('2d');

    var clientHeight = document.getElementById('localflags').clientHeight;
    var clientWidth = document.getElementById('localflags').clientWidth * (1 / scale) - 10;


    // resize the canvas
    canvas.height = clientHeight;
    canvas.width = clientWidth;

    var barwidth = clientWidth / 10;

    context.beginPath();
    context.rect(0, 0, clientWidth, clientHeight);
    context.fillStyle = 'purple';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();

    var c=document.getElementById("oilFlag");
    var ctx=c.getContext("2d");
    ctx.fillStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.fillRect(barwidth,0,barwidth,clientHeight);

    var ctx=c.getContext("2d");
    ctx.fillStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.fillRect(barwidth * 3,0,barwidth,clientHeight);

    var ctx=c.getContext("2d");
    ctx.fillStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.fillRect(barwidth * 5,0,barwidth,clientHeight);

    var ctx=c.getContext("2d");
    ctx.fillStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.fillRect(barwidth * 7,0,barwidth,clientHeight);

    var ctx=c.getContext("2d");
    ctx.fillStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.fillRect(barwidth * 9,0,barwidth,clientHeight);


    if ( turn ) {

            var artificiallength = turn.length + 7;
            var divisor = '1.'+artificiallength.toString();
            var divisor = 2.4;            
            var textheight = (clientHeight / divisor);
            var ctx = c.getContext("2d");
            var textString = turn;
            ctx.font= textheight.toString()+"px Verdana";
            context.fillStyle = 'white';
            textWidth = ctx.measureText(textString ).width;
            ctx.fillText(textString , (clientWidth/2) - (textWidth / 2), (clientHeight) - (textheight/2));
    }

}

