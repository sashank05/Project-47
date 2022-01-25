var PLAY = 1;
var END = 0;
var gameState = PLAY;

var jack, jack_running, jack_jumping;
var jungle,jungleImage;
//var jungle2,jungleImage2;
var netImage;
var trapImage;
var rockImage;
var obstaclesGroup;
var invisibleGround;
var gameOverImg;


function preload(){
  jack_running = loadAnimation("Images/jack_running_right.png","Images/jack_running_left.png","Images/jack_landing.png");
  
  jungleImage = loadImage("Images/jungle_bg.jpg");
  
  //jungleImage2 = loadImage("Images/jungle_bg.jpg");
  
  netImage = loadImage("Images/net_trap.png");
  trapImage = loadImage("Images/trap.png");
  rockImage = loadImage("Images/rock.png");

  gameOverImg = loadImage("Images/gameOver.png");

  jack_jumping = loadAnimation("Images/jack_landing.png");
}

function setup() {
  createCanvas(1000,473);
    
  jungle = createSprite(615,235,1228,473);
  jungle.addImage("jungle",jungleImage);

  /*jungle2 = createSprite(1615,1235,1228,473);
  jungle2.addImage("jungle2",jungleImage);*/

  jack = createSprite(90,350,20,50);
  
  jack.addAnimation("running", jack_running);
  
  jack.scale = 0.5;

  invisibleGround = createSprite(90,450,400,10);
  invisibleGround.visible = false;

  obstaclesGroup = createGroup();

  gameOver = createSprite(307.5,117.5);
  gameOver.addImage(gameOverImg);
  
  jack.setCollider("circle",0,0,150);
  jack.debug =true;
  score = 0;
}

function draw() {
  background("green");
   
  text("Score: "+ score, 500,50);

  if(gameState === PLAY){
    gameOver.visible = false;
    jungle.velocityX = -5;
     if (jungle.x <= 500){
    jungle.x = 600
   }

     /*jungle2.velocityX = -2;
    if (jungle2.x <= 900){
    jungle2.x = 1200;
  }*/

  score = score + Math.round(frameCount/60);
    spawnObstacles();

    if(keyDown("space")&& jack.y >= 150) {
      jack.velocityY = -12;
      jack.changeAnimation("jumping", jack_jumping);
    }
    jack.velocityY = jack.velocityY + 0.8

    

    if(obstaclesGroup.isTouching(jack)){
      gameState = END;
    }
}
else if (gameState === END) {
  gameOver.visible = true;

  jungle.velocityX = 0;
  jack.velocityX = 0;
  
  obstaclesGroup.setLifetimeEach(-1);
  obstaclesGroup.setVelocityXEach(0);

}
jack.collide(invisibleGround);

  drawSprites();
}


function spawnObstacles(){
  if(frameCount % 120 === 0){
    var obstacle = createSprite(round(random(615,900)),400,20,20);
    obstacle.scale = 0.3
    obstacle.velocityX = jungle.velocityX;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(netImage);
              break;
      case 2: obstacle.addImage(trapImage);
              break;
      case 3: obstacle.addImage(rockImage);
              break;
      default: break;
    }

    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);

}
}
