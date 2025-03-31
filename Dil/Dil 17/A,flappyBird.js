///ball
let ball;
let ballSize = 20
///floor
let floor;
///obsticals
let obsticalArray = []
///game
gameStart = false
game_over = false
score = 0


function preload(){
  birdImg = loadImage('flappybird.png',50,50)
  pipeImg = loadImage('Pipe.png')
  
  ////need to figure out how to re size the img
}

function setup() {
	new Canvas(500, 500);
	displayMode('centered');
	//obsticalSpawn()
	SpriteDef()
	setInterval(obsticalSpawn,random(2000,3000))
}

function SpriteDef() {
	ball = new Sprite();
	ball.diameter = ballSize
	ball.image = birdImg
	ball.scale = 0.2

	//floor = new Sprite(width / 2, height, width / 2, 10, 's')
}

function obsticalSpawn(){
	//                      x     y width        height                         collision type
	top_pipe = new Sprite(height, 0, 30, random(500, width/2 + (ball.diameter*2)),'k')
	bottom_pipe = new Sprite(height, width - 10, 30, random(500, width/2 + (ball.diameter*2)),'k')
	// top_pipe.image = pipeImg
	// top_pipe.scale = 0.5
	// top_pipe.image.width = 0.1
	// top_pipe.image.length = random(500, width/2 + (ball.diameter*2))
	
	obsticalArray.push(bottom_pipe, top_pipe)
}

function display(){
	
	for(let obs of obsticalArray){
		move = obs.x - 10
        obs.moveTo(move,obs.y)
		birdCollision(obs)
	}

	if(ball.vel.y == world.gravity){
		ball.rotate(25)
	}
	else if(ball.vel.y == -5){
		ball.rotate(-25)
	}
}

function wallHit(){
	if (ball.y >= height - ballSize/2){
		game_over = true
	}
	if(ball.y <= 0 + ballSize/2){
		game_over = true
	}
}

function birdCollision(obs){
    ///////hits tube
	if(ball.collides(obs)){
	  game_over = true
	  //alert('hit')
	}
    
	//////score
	if(ball.x == obs.x){
      score += 0.5
	}

  
}

function draw() {
	background('skyblue');
	textSize(20)

    if(!game_over){
		world.gravity.y = 10
		///display
	    display()

		//////game ending
		wallHit()

	}

	if(game_over){
		gameOver()
	}

	/////text
	fill("black")
	text(score,50,50)
}

function gameOver(){
  background('black')
  textSize(50)
  fill("red")
  textAlign(CENTER,CENTER)
  text('Game Over',width/2,height/2)
}

function keyPressed(){
	if(key === ' '){
		ball.speed = 5
		jumpHeight = ball.y - 40
		ball.moveTo(ball.x, jumpHeight)
	}
}