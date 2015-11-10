#include <RFduinoGZLL.h> // include rfduino library
device_t role = DEVICE4; // set Device name... DEVICE2 to DEVICE7 / HOST

String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;  // whether the string is complete

void setup()
{
  Serial.begin(115200); // begin serial communications
  
  inputString.reserve(200);  

  RFduinoGZLL.txPowerLevel = 0;

  // start the GZLL stack
  RFduinoGZLL.begin(role); // begin BLE communications
}

void loop()
{
  char mydata[8]; // declare mydata array
  String inData;
  
  serialEvent(); //call the function
  if (stringComplete) {
    //Serial.println(inputString);
    inData="k,"+inputString;
    // clear the string:
    inputString = "";
    stringComplete = false;
  }
 // Serial.println(inData); // print buffer to serial

  inData.toCharArray(mydata, 8); // place mystr data into character buffer

  RFduinoGZLL.sendToHost(mydata, 8); // send buffer to host other rfduino
    delay(25);
  
}

void serialEvent() {
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read();
    //int inInt = (int)Serial.read();
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    if (inChar == '\n') {
      stringComplete = true;
    }
  }
}
