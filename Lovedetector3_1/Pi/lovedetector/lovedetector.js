//////////////////////////////////////////////////////////////////
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var port = new SerialPort("/dev/ttyAMA0", {
  baudrate: 115200,
  parser: serialport.parsers.readline("\n")
}, false); // this is the openImmediately flag [default is true]
///Parse data
var Parse = require('node-parse-api').Parse;
var APP_ID = "FOyGIV2D0JKqn0z8TSEkmE31CVVVjN0Bb2GuMuFJ";
var MASTER_KEY = "DeXV22mWpFf6sbeDTbbv2CoIlmF8ZnNgiLzxeL8w";
var appParse = new Parse(APP_ID, MASTER_KEY);
var bodyParser = require('body-parser');
var io = require("socket.io").listen(port);  


io.sockets.on('connection', function (socket) {
port.open(function(error) {

  if (error) {
    console.log('failed to open: ' + error);
  } else {
    
    console.log('Serial open');
    port.on('data', function(data) {
    //console.log('data length: ' + data.length);
      
    inData = data;

    if (inData.char[2] == 'B'){
    	BPM1 = inData;

    }

     if (inData.char[2] == 'N'){
    	BPM2 = inData;
    
    }

     if (inData.char[2] == 'Q'){
    	IBI1 = inData;
    
    }

    if (inData.char[2] == 'W'){
    	IBI2 = inData;
    
    }

 appParse.insert('Lovedetector', { BPM1: BPM1.BPM1, BPM2: BPM2.BPM2, IBI1: IBI1.IBI1, IBI2: IBI2.IBI2}, function (err, response) {
    console.log(response);




});
});
}
});
});
//////////////////////////////////////////////////////////////////
/* This is where the detection code will be, I only have my first draft in Arduino code, which I put here to show.
 // FOR THE LOVE SIGNAL TO TURN ON THE HEARTSBEATS HAVE TO HIT 3 CERTAIN MOVEMENT PATTERNS THAT ONLY SHOWS IN
 // 2 PEOPLE IN LOVE

 // if the male pulse goes from decrease to increase at the same time as the female is increasing 
 // (rate2[7]>rate2[8]) are left out to able eventual offpath pulse when increasing
 if ( (rate2[6]>rate2[7]) && (rate2[8]>rate2[9]) && (rate1[6]<rate1[7]) && (rate1[7]>rate1[8]) && (rate1[8]>rate1[9]) ){ 
   ManChange = true;  // activates rule 1 by boolean
  }
  
  // if the female pulse goes from increasing to decreasing at the same time as the male is increasing 
 // (rate1[7]>rate1[8]) are left out to able eventual offpath pulse when increasing 
  if ( (rate1[6]>rate1[7]) && (rate1[8]>rate1[9]) && (rate2[6]>rate2[7]) && (rate2[7]<rate2[8]) && (rate2[8]<rate2[9]) ){
   FemChange = true; // activates rule 2 by boolean
  }
  
  // if both heartrates are increasing at the same time
  if ( (rate2[2]>rate2[3]) && (rate2[3]>rate2[4]) && (rate2[4]>rate2[5]) && (rate1[5]>rate1[6]) && (rate1[6]>rate1[7]) && (rate1[7]>rate1[8]) ){
    CoRaise = true; // activates rule 3 by boolean
  }
 
  //THE LOVE SIGNAL
  if ( ManChange == true && FemChange == true && CoRaise == true ){ // if all 3 rules are fulfilled
    digitalWrite(lovePin,HIGH);                         // turn on the love signal on the detector
    if(millis() - time >= timeDelay){                   // turn of love signal after 5 seconds and reset booleans
     digitalWrite(lovePin,LOW); 
     ManChange = false;
     FemChange = false;
     CoRaise = false; 
     time = millis(); 
    }
  }*/
var GPIO = require('onoff').Gpio,
    led = new GPIO(17, 'out');

    led.writeSync(1); //turn on LED


/////////////////////////////////////////////////////////////////// 

