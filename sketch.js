var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var rex;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;         
var score;                
var bck,bck1;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var wewish;
var neffex;
 
function preload(){
trex_running = loadAnimation("1ST.PNG","2ND.PNG","3RD.PNG","4TH.PNG","5TH.PNG","6TH.PNG");
trex_collided = loadImage("run.webp");
rex1 = loadImage("chr.PNG");
groundImage = loadImage("ground2.png");
rex = loadImage("sn.PNG")
cloudImage = loadImage("cloud.png");
obstacle1 = loadImage("t.PNG");
obstacle2 = loadImage("tr.PNG");
obstacle3 = loadImage("trr.PNG");
obstacle4 = loadImage("trrr.PNG");
obstacle5 = loadImage("trrrr.PNG");
obstacle6 = loadImage("trrrrr.PNG");
bck1 = loadImage("merr.PNG");
restartImg = loadImage("restart.png");
gameOverImg = loadImage("gameOver.png");
jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");
checkPointSound = loadSound("checkPoint.mp3");
wewish = loadSound("We Wish.mp3");
neffex = loadSound("NEFFEX.mp3");
} 
 
function setup() {
  createCanvas(900, 500);
  
  bck = createSprite(450,250,900,500);
  bck.addImage(bck1);
  bck.scale = 2;
   
  trex = createSprite(50,420,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 0.6;   
  ground = createSprite(500,475,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg); 
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,420,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  trex.setCollider("circle",0,0,40);
  trex.debug = false;
  
  score = 0;
   
} 
 
function draw() {
  
  if(keyDown("M")){
    wewish.play();
  }
  
  if(keyDown("C")){
    neffex.play();
  }
  
  background(180);
  background("white");
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    } 
    
    if(trex.isTouching(obstaclesGroup) ){

      trex_collided =         
      createSprite(450,250,900,500); 
      trex_collided.addImage(rex); 
      trex_collided.scale = 2;
      
    } 
    
  
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 370) {
        trex.velocityY = -20;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END) {
     console.log("hey")
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      trex.velocityY = 0
     
      //change the trex animation
      trex.changeAnimation("collided", trex_collided);
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(500,420,10,40);
   obstacle.velocityX = -7;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6); 
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.6;
   
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

