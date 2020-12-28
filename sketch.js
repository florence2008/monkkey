
var monkey , monkey_running,monkeycollide;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground; 
var PLAY = 1 ;
var END = 0;
var gamestate = PLAY;
var  bananascore = 0;
var st =0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeycollide = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  
 
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  monkey = createSprite(50,height-630,20,20);
  monkey.addAnimation("running",monkey_running);
 monkey.addAnimation("collide", monkeycollide);
  monkey.scale = 0.17;
  
  
 ground = createSprite(width/2,height,width,18);
  
  bananagroup = createGroup();
  obstaclegroup = createGroup();

}
function draw() {
 if(gamestate ===PLAY){ 
    bananas();
    obstacles();
   ground.shapeColor = "green"
  background("lightblue");
   
  monkey.collide(ground);
   
  
       if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
     if((touches.length > 0 || keyDown("SPACE")) && monkey.y >= height-520) {
         
              monkey.velocityY = -12;
         touches = [];
        }
 
    monkey.velocityY = monkey.velocityY + 0.4; 
   
   if (monkey.isTouching(bananagroup)){
       bananagroup.destroyEach();
       bananascore  = bananascore+ 1;
    
    }
   
   if (monkey.isTouching(obstaclegroup)){
       monkey.scale = 0.09;
       gamestate = END;
    

    }
        switch(score){
       case 1:player.scale=1;
         break;
       case 5:player.scale=2;
         break;
       case 10:player.scale=3;
         break;
       case 15:player.scale=4;
         break;
         default: break;
     }
      fill("black");
  textSize(25)
   textFont("Akzidenz-Grotesk");
  st = Math.ceil(frameCount/frameRate())
  text("survival time :" + st,10,50);
  
  fill("black");
  textSize(25)
  textFont("Akzidenz-Grotesk")
 
  text("bananas :"+ bananascore,450,50);

   if(gamestate === END){
     
      ground.velocityX = 0;
      monkey.velocityY=0;
      monkey.velocityX = 0;
     
     monkey.changeAnimation("collide",monkeycollide)
  
     obstaclegroup.setVelocityXEach(0);
     bananagroup.setVelocityXEach(0);
     obstaclegroup.setLifetimeEach(-1);
     bananagroup.setLifetimeEach(-1);
      
     fill("red");
    textSize(30);
     textFont("Akzidenz-Grotesk");
     text("💔you lose💔",250,350);
      }
    } 

  drawSprites();

}
function bananas (){
  if(frameCount%80===0){
     banana = createSprite(width+620,height-750,20,20);
     banana.y = Math.round(random(200,500));
     banana.scale = 0.1
     banana.velocityX = -10;
     banana.addImage(bananaImage);
     bananagroup.add(banana)
     banana.lifetime = 200;
     
  }
}

function obstacles(){
  if(frameCount%100 === 0 ){
       obstacle = createSprite(700,height-30,20,20);
       obstacle.scale = 0.13;
       obstacle.addImage(obstacleImage);
       obstacle.velocityX = -12;
       obstaclegroup.add(obstacle)
       obstacle.lifetime = 160;
      
     

  }
}
