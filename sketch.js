const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint  = Matter.Constraint;

var ground, tree, tree_Img, boy, boy_Img;
var mango1, mango2, mango3, mango4, mango5, mango6, mango7, mango8;
var stone;
var launcher;

function preload()
{
  tree_Img = loadImage("tree.png");	 
  boy_Img = loadImage("boy.png"); 
}

function setup() {
	createCanvas(1200, 700);
	tree = createSprite(width-300, height/2, 0, 0);
	boy = createSprite(200, height-120, 0, 0);
 
	engine = Engine.create();
	world = engine.world;

  ground = new Ground (width/2, height-10, width, 10);
  
  mango1 = new Mango (width-300, 100, 25);
  mango2 = new Mango (width-450, 250, 25);
  mango3 = new Mango (width-80, 270, 25);
  mango4 = new Mango (width-300, 300, 25);
  mango5 = new Mango (width-200, 150, 25);
  mango6 = new Mango (width-420, 170, 25);
  mango7 = new Mango (width-180, 250, 25);
  mango8 = new Mango (width-310, 200, 25);

  stone = new Stone (0, 0, 25);

  launcher = new Launcher (stone.body, {x:120, y:height-200});
 
	Engine.run(engine); 
}


function draw() {

  background("grey");
  textSize(25);
  fill("white");
  text("Press 'Space' to get a second Chance to Play!!",50 ,50);
  Engine.update(engine);
  

  drawSprites();
  tree.addImage(tree_Img);
  tree.scale = 0.5;
  boy.addImage(boy_Img);
  boy.scale = 0.15;
  
  ground.display();
  
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  mango7.display();
  mango8.display();

  stone.display();

  launcher.display();

  detectCollision(stone, mango1);
  detectCollision(stone, mango2);
  detectCollision(stone, mango3);
  detectCollision(stone, mango4);
  detectCollision(stone, mango5);
  detectCollision(stone, mango6);
  detectCollision(stone, mango7);
  detectCollision(stone, mango8);
 
}

function mouseDragged(){
  Matter.Body.setPosition(stone.body, {x:mouseX, y:mouseY});
}

function mouseReleased(){
  launcher.fly();
}

function keyPressed(){
  if (keyCode === 32){
    Matter.Body.setPosition(stone.body, {x:235, y:420});
    launcher.attach(stone.body);
  }
}

function detectCollision(lstone, lmango){
  stoneBodyPosition = lstone.body.position;
  mangoBodyPosition = lmango.body.position;
  
  var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y)
  if (distance<=lmango.r+lstone.r){
    Matter.Body.setStatic(lmango.body, false);
  }
}

