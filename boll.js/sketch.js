var boll = [];

function setup() {
  smooth();
  createCanvas(600,600);
  for (var i=0; i < 50; i++){
    boll.push(new Ball());
}
}
function draw() {
  background(0);
  for (var i=0; i<boll.length; i++) {
    boll[i].move();
    boll[i].display();
    boll[i].collision();
    print(boll[i].x, boll[i].y);
    
    for(var j=i; j<boll.length; j++)
    {
      if(i!=j)
      {
        var distance = dist(boll[i].x,boll[i].y,boll[j].x,boll[j].y);
        if(distance<=(boll[i].rad+boll[j].rad)/2+1)
        {
          
            boll[i].rad = floor(distance);
            boll[j].rad = floor(distance);
          
          }
         
        }
      }
  }
}

function Ball(){
  this.rad = random(10, 40);
  this.x = random(width);
  this.y = random(height);
  this.speed = random(-1,1);
  
  this.move = function() {
    this.x += this.speed;
    this.y += this.speed;
  };
  
  this.display = function() {
    stroke(random(255));
    fill(random(0),random(0),random(0));
    ellipse(this.x, this.y, this.rad, this.rad);
  };
  
  this.collision = function() {
    if (this.y + this.rad >= height) {
    this.y.speed *= random(-2);
    this.x.speed *= random(2);
  }
 
  if (this.y - this.rad <= height-height) {
    this.y.speed *= random(-2);
    this.x.speed *= random(-2);
  }
  
  if (this.x + this.rad >= width) {
    this.x.speed *= random(-2);
    this.y.speed *=random(-2);
  }
 
  if (this.x - this.rad <= width-width) {
    this.x.speed *= random(-2);
    this.y.speed *= random(-2);
  }
  };
 } 
