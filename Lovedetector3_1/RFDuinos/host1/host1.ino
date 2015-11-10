#include <RFduinoGZLL.h> // include rfduino library

device_t role = HOST; // set Device name... DEVICE2 to DEVICE7 / HOST
String inData;
void setup()
{
  Serial.begin(115200); // begin serial communications
  // start the GZLL stack  
  RFduinoGZLL.begin(role); // begin BLE communications
}

void loop()
{
  Serial.println(inData);
 
 delay(25);
}

void RFduinoGZLL_onReceive(device_t device, int rssi, char *data, int len) // this function receives BLE communications
{
char state = data[0];
  if (data[0]==107){ // if first character is a (ascci code 97) then print out the data
  
//  Serial.print(device); // print the device name
//  Serial.print(","); 
//  Serial.print(abs(rssi)); // print distance from device to host
//  Serial.print(",");
//  Serial.print(data);
//  Serial.print(",");
//  Serial.print(len); // print out lenght of recived data buffer
 // Serial.print(data);
inData=data; // print out data
 
  
  
 // if (device == DEVICE2)  // if device name is DEVICE2 relay the last known state to DEVICE2
   // RFduinoGZLL.sendToDevice(device, "data from host");
}
}
