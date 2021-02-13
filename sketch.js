var balloon;
var database;
var backgroundImg;
var balloonImage2;

function preload(){
backgroundImg = loadImage("Hot Air Ballon-01.png");
balloonImage1 = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03","Hot Air Ballon-04")
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  balloon = createSprite(400, 200, 50, 50);
  balloon.shapeColor = "black";
  //balloon.addAnimation("")
  var balloonPosition = database.ref(`balloon/height`);
  balloonPosition.on("value",readPosition, showError);
}

function draw() {
  background(backgroundImg);  
  if(keyDown(LEFT_ARROW)){
  updateHeight(-10,0);
  balloon.addAnimation("hotAirBalloon",balloonImage2)
  balloon.scale=balloon.scale -0.01;
    //balloon.x = balloon.x -10;
    //changePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
  updateHeight(+10,0);
  balloon.addAnimation("hotAirBalloon",balloonImage2)
  balloon.scale=balloon.scale -0.01;
  // balloon.x = balloon.x +10;  
  //changePosition(1,0);
}
else if(keyDown(UP_ARROW)){
  updateHeight(0,-10);
  balloon.addAnimation("hotAirBalloon",balloonImage2)
  balloon.scale=balloon.scale -0.01;
  //balloon.y = balloon.y -10;  
  //changePosition(0,-1);
}
else if(keyDown(DOWN_ARROW)){
  updateHeight(0,+10);
  balloon.addAnimation("hotAirBalloon",balloonImage2)
  balloon.scale=balloon.scale -0.01;
  //balloon.y = balloon.y +10;  
  //changePosition(0,+1);
}
  drawSprites();
}

function updateHeight(x,y){
  database.ref(`balloon/height`).set({
    x : height.x + x ,
    y : height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}