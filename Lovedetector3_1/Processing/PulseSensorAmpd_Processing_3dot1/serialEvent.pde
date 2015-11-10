



void serialEvent(Serial port){ 
   String inData = port.readStringUntil('\n');
   println(inData);

   if (inData == null) {                 // bail if we didn't get anything
     return;
   }   
   if (inData.isEmpty()) {                // bail if we got an empty line
     return;
   }
   inData = trim(inData);                 // cut off white space (carriage return)   
   if(inData.length() <= 5) {             // bail if there's nothing there
     return;
   }

   if (inData.charAt(2) == 'S'){          // leading 'S' for sensor data KIM
     inData = inData.substring(3);        // cut off the leading 'S' KIM
     Sensor1 = int(inData);                // convert the string to usable int
   }
   if (inData.charAt(2) == 'D'){          // leading 'S' for sensor data KIM
     inData = inData.substring(3);        // cut off the leading 'S' KIM
     Sensor2 = int(inData);                // convert the string to usable int
   }
   
   if (inData.charAt(2) == 'B'){          // leading 'B' for BPM data KIM
     inData = inData.substring(3);        // cut off the leading 'B' KIM
     BPM1 = int(inData);                   // convert the string to usable int
     beat1 = true;                         // set beat flag to advance heart rate graph
     heart1 = 20;                          // begin heart image 'swell' timer
   }
   if (inData.charAt(2) == 'N'){          // leading 'B' for BPM data KIM
     inData = inData.substring(3);        // cut off the leading 'B' KIM
     BPM2 = int(inData);                   // convert the string to usable int
     beat2 = true;                         // set beat flag to advance heart rate graph
     heart2 = 20;                          // begin heart image 'swell' timer
   }
 if (inData.charAt(2) == 'Q'){            // leading 'Q' means IBI data KIM
     inData = inData.substring(3);        // cut off the leading 'Q' KIM
     IBI1 = int(inData);                   // convert the string to usable int
   }
 if (inData.charAt(2) == 'W'){            // leading 'Q' means IBI data KIM
     inData = inData.substring(3);        // cut off the leading 'Q' KIM
     IBI2 = int(inData);                   // convert the string to usable int
   }
}
