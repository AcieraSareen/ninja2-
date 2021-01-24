  //gamestates
  var PLAY=1;
  var END=0;
  var gamestate=PLAY;
  //naming variables 
  var sword,fruit,alien;
  //images of the variables
  var swordImage,fruit1Image,fruit3Image,fruit2Image,
  fruit4Image, alienImage;
  //gameover and restart variables and images 
  var gameOver,gameOverImage;
  //score variable
  var score;
  //groups
  var fruitGroup,alienGroup;
  //sound
  var sound,endSound;


  function preload(){


  //loadingImage of sword 
  swordImage=loadImage("sword.png");
  fruit1Image=loadImage("fruit1.png");
  fruit2Image=loadImage("fruit2.png");
  fruit3Image=loadImage("fruit3.png");
  fruit4Image=loadImage("fruit4.png");
  alienImage=loadAnimation("alien1.png","alien2.png");
  sound=loadSound("Swoosh 3-SoundBible.com-1573211927.wav")
  endSound=loadSound("137429094-cartoon-voice-uh-oh-looks-trou.m4a");
  
   
  //loading gameover and restart image
  gameOverImage=loadImage("gameover.png");
  }
  function setup() {

  //creating canvas
  createCanvas(600,600);

  //creating sword
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
   
  //setting collider
  sword.setCollider("rectangle",0,0,40,40);
  //creating groups 
  fruitGroup=new Group();
  alienGroup=new Group();
  //setting score to 0
  score=0




  }

  function draw(){
  background("brown");

  //displaying score
  text("Score:"+ score, 500,50);

  //
  if(gamestate===PLAY){
    fruits();
    enemy();
  //moving the sword with mouse
  sword.y=World.mouseY;
  sword.x=World.mouseX;

  if(fruitGroup.isTouching(sword)){
  fruitGroup.destroyEach();
  sound.play();
  score=score+2;

  }
  if(alienGroup.isTouching(sword)){
  gamestate=END; 
  endSound.play();
   }

  }

  else if(gamestate===END){
  fruitGroup.destroyEach();
  alienGroup.destroyEach();
  fruitGroup.setVelocityXEach(0);
  alienGroup.setVelocityXEach(0);
  //creating GAME OVER sprite     
  gameOver=createSprite(300,300,100,10);
  gameOver.addImage(gameOverImage);
  gameOver.scale=2.0
  //sword.addImage(gameOverImage);
  sword.x=200;
  sword.y=200;

  }





  drawSprites();
  }



  //creating function for fruits             
  function fruits(){
  if(World.frameCount%80===0){
  fruit=createSprite(400,200,20,20);
  fruit.scale=0.2;
  //fruit debug=true;
  r=Math.round(random(1,4));
  if(r==1){
  fruit.addImage(fruit1Image);
  }else if(r==2){
  fruit.addImage(fruit2Image);
  }else if(r==3){
  fruit.addImage(fruit3Image);
  }else{
  fruit.addImage(fruit4Image);
  }
  fruit.y=Math.round(random(50,340));
  fruit.velocityX=-(7+(score/2));
  fruit.setLifetime=100;
  fruitGroup.add(fruit);
  }
  
   }

  //creating function for enemy
  function enemy(){
  if (World.frameCount%200===0){
  alien=createSprite(400,200,20,20);
  alien.y=Math.round(random(100,300));
  alien.velocityX=-(7+(score/2));
  alien.setLifetime=50;
  alien.addAnimation("alien",alienImage);

  alienGroup.add(alien);
  }
  }




    
