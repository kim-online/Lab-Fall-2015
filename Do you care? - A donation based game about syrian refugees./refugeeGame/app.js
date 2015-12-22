var bodyParser = require('body-parser');
var express = require("express");
var app = express();//create instance of express
var port = 8000;
var url='localhost'
var server = app.listen(port);
var io = require("socket.io").listen(server);//socket io listen on port
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sport = new SerialPort("/dev/cu.usbmodem1421", { 
  baudrate: 9600,
  parser: serialport.parsers.readline("\n") //parse data when end of line present
}, false);

app.use(express.static(__dirname + '/'));//serve diectory this file is in
console.log('Simple static server listening at '+url+':'+port);

io.sockets.on('connection', function (socket) {
    sport.open(function(error) {
        if (error) {
            console.log('failed to open: ' + error);
        } else {
            console.log('Serial open');

            sport.on("data", function (data) {
            data.split(',');
            data[1];
                if (data[0]>0){
                    socket.emit('toScreen', data[0] + data[1]); 
                }
            console.log(data);
            });
        }
    });
});