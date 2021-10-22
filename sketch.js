var tigercub,tigercubImage;
var obstacle,obstaclesGroup,obstacleImage;
var score,bg,bgImage;
var coin,coinsGroup,coinImage;

function preload(){
     bgImage=loadImage("jungle.jpg");
  tigercubImage=loadImage("tigercub.jpg");
  obstacleImage=loadImage("stone.jpg","obstacle1.jpg");
  coinImage=loadImage("coin.jpg");
}

function setup() {
 createCanvas(600,600);
 
  bg=createSprite(0,0,600,600);
  bg.addImage(bgImage);
  bg.scale = 2.5;
  
   tigercub=createSprite(80,315,20,20);
   tigercub.addAnimation("tigercub", tigercubImage);
   tigercub.scale=0.1;
 
    ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  console.log(ground.x);

  coinsGroup = new Group();
  obstaclesGroup = new Group();

 
  score = 0;
  
function draw() {
    background(255);
 
   
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
 
   if(bg.x<0) {
    bg.x=bg.width/2;
  }
 
   if(keyDown("space") ) {
      tigercub.velocityY = -12;
    }
    tigercub.velocityY = tigercub.velocityY + 0.8;
 
    tigercub.collide(ground);  
    spawnCoins();
    spawnObstacles();
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);    
  
   if(coinsGroup.isTouching(tigercub)){
    score=score+2;
    coinsGroup.destroyEach();
    
  }
   if(obstaclesGroup.isTouching(tigercub)){
        ground.velocityX = 0;
        tigercub.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        coinsGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        coinsGroup.setLifetimeEach(-1);
        stroke("white");
        textSize(20);
        fill("white");
        text("Game end ", 300,300); 
   
   
    }
 
 
}

function spawnCoins(){
  if (frameCount % 80 === 0) {
    coin=createSprite(600,250,40,10);
    coin.y = random(120,200);    
    coin.velocityX = -5;
   
    
    coin.lifetime = 300;
   tigercub.depth = coin.depth + 1;
   
   
     coin.addImage("coin",coinImage);
    coin.scale=0.05;
   
    
    coinsGroup.add(coin);
  }
  }

function spawnObstacles(){
    if(frameCount % 300 == 0) {
    obstacle=createSprite(800,320,10,40);
    obstacle.velocityX = -6;
   
   
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
   
    
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
  }
}
  function play(){
    
    if(allPlayers !== undefined){
     
     var index=0;
     var x=0;
     
      for(var plr in allPlayers){
        index=index+1;
        x=x+200;
        
        tigercub(index-1).x=x
        
        if (index == player.index){
          tigercub[index-1].shapeColor=red;
        }
        camera.position.x=displayWidth/2;
        
        
      }
    }

}
}