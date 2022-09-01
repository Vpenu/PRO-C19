var spaceImg, space;
var rocketImg, rocket;
var meteorImg, meteor, meteorsGroup;
var starImg, star, starsGroup;
var PLAY=1;
var END=0;
var gameState=1;
var starCollection = 0;

function preload(){
    spaceImg = loadImage("space.jpeg");
    rocketImg = loadImage("rocket.png");
    meteorImg = loadImage("meteor.png");
    starImg = loadImage("star.png");
}

function setup() {
    createCanvas(600,600);
    space = createSprite(300,300);
    space.addImage("space",spaceImg);
    space.velocityY = 2;

    meteorsGroup = new Group;
    starsGroup = new Group;

    rocket = createSprite(300,285,50,50);
    rocket.addImage("rocket",rocketImg);
    rocket.scale = 0.8;
}

function draw() {
    background(200);
    drawSprites();
    edges= createEdgeSprites();
    rocket.collide(edges);
    
  if(gameState === PLAY){
    if(keyDown("right_arrow")){
        rocket.x = rocket.x + 5;
    }

    if(keyDown("left_arrow")){
        rocket.x = rocket.x - 5;
    }

    if(keyDown("up_arrow")){
        rocket.y = rocket.y - 5;
        space.velocityY=space.velocityY+0.1;
    }

    if(keyDown("down_arrow")){
        rocket.y = rocket.y + 5;
    }

    if(space.y>400){
        space.y = 300;
    }

    fill(255);
    textSize(25);
    text("Score: "+ starCollection,15,30);

//call star and meteor functions
    createMeteors();
    createStars();

    if (starsGroup.isTouching(rocket)){
        starsGroup.destroyEach();
        starCollection=starCollection+100;
    }
    if(meteorsGroup.isTouching(rocket)){
        gameState = END;
    }



  }

  if(gameState ===END){
    space.velocityY = 0;
    meteor.velocityY = 0;
    star.velocityY = 0;
    rocket.x = 300;
    rocket.y = 285;
    fill("green");
    textSize(50);
    text("Game Over",180,275);
  }
 
  


}

function createMeteors(){
    if(frameCount%240===0){
        meteor = createSprite(200,-50);
        meteor.addImage("meteor",meteorImg);
        meteor.addImage(meteorImg);
        meteor.x = Math.round(random(250,400));
        meteor.scale = 0.3;
        meteor.velocityY = 2;
        meteor.lifetime = 300;
        meteorsGroup.add(meteor);
    }
}

function createStars(){
    if(frameCount%240===0){
        star = createSprite(200,-50);
        star.addImage("star",starImg);
        star.addImage(starImg);
        star.x = Math.round(random(100,400));
        star.scale = 0.3;
        star.velocityY = 2;
        star.lifetime = 300;
        starsGroup.add(star);
    }

    
}