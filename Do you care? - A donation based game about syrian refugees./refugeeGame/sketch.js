var socket;
var player;
var enemy;
var timeSince;
var d;
var penny = false;
var nickel = false;
var dime = false;
var quarter = false;
var button = false;
var donated = 0;
var cares = 0;
var careImg;
var fontBodoni;
var time2 = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:8000');

  //Load Bodoni Bold font
  fontBodoni = loadFont("data/BodoniFLF-Bold.ttf");

  //Refugee
  player = createSprite(width/2, height/2, 40,40);
  player.velocity.x = 4;
  player.setCollider("rectangle", 0,0,40,40);

  //Enemies
  enemy1 = createSprite(width/20, height/2, 40,40);
  enemy2 = createSprite(width/20, height/4, 40,40);
  enemy3 = createSprite(width/20, (height/2+height/4), 40,40);

  enemy1.velocity.x = 4;
  enemy2.velocity.x = 4;
  enemy3.velocity.x = 4;

  enemy1.setCollider("rectangle", 0,0,40,40);
  enemy2.setCollider("rectangle", 0,0,40,40);
  enemy3.setCollider("rectangle", 0,0,40,40);

  timeSince = millis();

  //Load image for ingame messages
  careImg = loadImage("data/care1.png");

  //Setting camera position
  camera.position.y = height/2;
 
  socket.on('toScreen',
    // When we receive data
    function(data) {
      // Setting booleans true depending on what coin is given. Also adding the value of each coin to "donated".
        if (data == 1){
          
          penny = true;
            for(var i=0; i<1; i++){
              donated++;
              
            }
        }
        if (data == 5){
         
          nickel = true;
            for(var i=0; i<5; i++){
              donated++;
              
            }
        }
        if (data == 10){
          
          dime = true;
            for(var i=0; i<10; i++){
              donated++;
              
            }
        }
        if (data == 25){
          
          quarter = true;
            for(var i=0; i<25; i++){
              donated++;
              
            }
        }
        //I gave button the number 99 to to be able to send it in the same socket.emit.
        if (data == 99){
          
          button = true;
          //Counting times the button has been pressed.
            for(var i=0; i<1; i++){
              cares++;
              
            }
        }
      
    }
  );
}

function draw() {

  
//Measuring the distance between the enemies and the Refugee.
d = int(dist(enemy1.position.x, enemy1.position.y, player.position.x, player.position.y));  
 
//If within this area, Stop.
  if(d < 600 && d > 596){
          
          
          enemy1.velocity.x = 4;
          enemy2.velocity.x = 4;
          enemy3.velocity.x = 4;
          
          
    
        }  
//If within this area, Stop.        
  if(d < 300 && d > 296){
          
          enemy1.velocity.x = 4;
          enemy2.velocity.x = 4;
          enemy3.velocity.x = 4;
    
        }
 //If within this area, Stop. And dont get all the way up to the Refugee.             
  if(d < 100 || d == 0){
          
          enemy1.velocity.x = 4;
          enemy2.velocity.x = 4;
          enemy3.velocity.x = 4;
    
        }
 //Stop before leaving screen.  
  if(d > 650 || d == 650){
          
          enemy1.velocity.x = 4;
          enemy2.velocity.x = 4;
          enemy3.velocity.x = 4;
    
        }      
 // If this coin is given, and not at the back, do this.        
  if(penny == true){
    if(d < 650){
      // Set a slower velocity, makes enemies back off.
          enemy1.velocity.x = 1;
          enemy2.velocity.x = 1;
          enemy3.velocity.x = 1;
          //Taking the time of when it was inserted.
          timeSince = millis();
          console.log(millis()-timeSince);
          //Get ready for new coin.
          penny = false;
        }
  }
// If this coin is given, and not at the back, do this. 
  if(nickel == true){
    if(d < 650){
      // Set a slower velocity, makes enemies back off.
          enemy1.velocity.x = 1;
          enemy2.velocity.x = 1;
          enemy3.velocity.x = 1;
          //Taking the time of when it was inserted and adding to it to give the refugee more time until the enemies start attacking again. Because of higher value coin.
          timeSince = (millis()+5000);
          //console.log(millis()-timeSince);
          //Get ready for new coin.
          nickel = false;
        }
  } 
// If this coin is given, and not at the back, do this. 
  if(dime == true){
    if(d < 650){
      // Set a slower velocity, makes enemies back off.
          enemy1.velocity.x = 1;
          enemy2.velocity.x = 1;
          enemy3.velocity.x = 1;
          //Taking the time of when it was inserted and adding to it to give the refugee more time until the enemies start attacking again. Because of higher value coin.
          timeSince = (millis()+10000);
          //console.log(millis()-timeSince);
          //Get ready for new coin.
          penny = false;
        }
  }
// If this coin is given, and not at the back, do this. 
  if(quarter == true){
    if(d < 650){
      // Set a slower velocity, makes enemies back off.
          enemy1.velocity.x = 1;
          enemy2.velocity.x = 1;
          enemy3.velocity.x = 1;
          //Taking the time of when it was inserted and adding to it to give the refugee more time until the enemies start attacking again. Because of higher value coin.
          timeSince = (millis()+15000);
          //console.log(millis()-timeSince);
          //Get ready for new coin.
          quarter = false;
        }
  } 

//If noone donates money during this time(number), get closer to the refugee. Number will be higher when used in real context.
if((millis()-timeSince)>30000){ 
  //Make sure they dont get to close.
  if(d > 50){
        enemy1.velocity.x = 8;
        enemy2.velocity.x = 8;
        enemy3.velocity.x = 8;
        //Reset it and take the time to start counting until next time to attack.
        timeSince = millis();
        }
      }
      //Troubleshooting, sometimes if the difference of this number got to negative, the value got stuck there, this is used to avoid that.
 if((millis()-timeSince)<(-6000)) {
  timeSince = millis();
 }    
//Always keep the Refugee in the center of the screen.
  camera.position.x = player.position.x;

  background(247, 134, 131); 

  drawSprite(enemy1);
  drawSprite(enemy2);
  drawSprite(enemy3);
  drawSprite(player);

//If button is pressed, do this.
  if(button == true){
     //time2 was something i was trying to use to get the picture to disappear after a certain time. Not successful so far.
      time2 = millis();
      //Send this message to the user when they press the button.
      image(careImg, (player.position.x+50), (player.position.y+20), 200, 200);
      //It doesnt work.
      if(millis()-time2>5000){    
          
          button = false;
          //setTimeout(button = false, 2000);
        }
  }
  //Text saying how much has been donated and how many people "cares".
  fill(0).strokeWeight(0).textSize(30);
  textFont(fontBodoni);
  text(cares+"People cares.", (player.position.x-300), 30);
  text(donated+"have been donated today.", (player.position.x+100), 30);
}

