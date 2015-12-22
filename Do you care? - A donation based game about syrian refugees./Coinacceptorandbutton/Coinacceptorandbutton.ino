/*
Credits to redpaperheart studio for coin determining code.
https://github.com/redpaperheart/Prototype-Coin-acceptor

*/

#include <Wire.h>
#define COIN 2
volatile boolean newCoin = false;  
volatile boolean jitter = false; 
volatile boolean jitter2 = false; 
volatile int pulseCount = 0;           //counts pulse for 
volatile int timeOut = 0;          //counts timeout after last coin inserted
String coinType;
int cents;

void setup() {
  // put your setup code here, to run once:
    Serial.begin(9600);
    pinMode(COIN, INPUT);
    pinMode(7, INPUT); // Button
    digitalWrite(COIN, HIGH); // pull up
    

}

void loop() {
  // put your main code here, to run repeatedly:

   
  int button = digitalRead(7);
//If button is pressed print 99 to Serial once.
  if (digitalRead(7)) {
    if (jitter2 == false){
      delay(300);
    Serial.println(99);
    
    jitter2 = true;
    
    }
  }

  if (! digitalRead(7)) {
    jitter2 = false;
  }
//If a coin is inserted, do this.
  if (digitalRead(COIN)) {
    if (jitter == false){
    newCoin = true;
    pulseCount++;
    timeOut = 0;
    jitter = true;
    }
  }
//Taking out the jitter. And get ready to see if more pulses are coming.
  if (! digitalRead(COIN)) {
    jitter = false;
  }


         if (newCoin == true){
            
            if(pulseCount == 50 || timeOut>40){           //timeOut insures that the pulses have finished before the coin Type is determined
              coinSwitch();
            }
            timeOut++;
            delay(5);
        } 
//Set pulseCount back to 0.
  if (timeOut>1000){
    if (pulseCount > 0){       
    pulseCount = 0;
  }
   // }
}
}
//Depending on how many pulses is sent before reseting. Determain what coin it is and print it to serial.
void coinSwitch(){
    switch (pulseCount) {                                //pulseCount can be anything from 1 to 50, programmed in the Coin Acceptor. There can be up to 4 cases. 
        case 3:
            cents = 1;
            Serial.println(cents,DEC);
            coinType = "penny";
            Serial.println("Coin Type: " + coinType);            
            pulseCount = 0;
            newCoin = false;
            break;
        case 5:
            cents = 5;
            Serial.println(cents,DEC);
            coinType = "nickel";
            Serial.println("Coin Type: " + coinType);            
            pulseCount = 0;
            newCoin = false;
            break;
        case 7:
            cents = 10;
            Serial.println(cents,DEC);
            coinType = "dime";
            Serial.println("Coin Type: " + coinType);
            pulseCount = 0;
            newCoin = false;
            break;
        case 9:
            cents = 25;
            Serial.println(cents,DEC);
            coinType = "quarter";
            Serial.println("Coin Type: " + coinType);
            pulseCount = 0;
            newCoin = false;
            break;
    }
}
