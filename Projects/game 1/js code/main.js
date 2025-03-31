let ball;
let game_over = false
let done = false
let first_collision = false
let obsNum = 13
let objectArray = []
let gap = 10



function setup() {
	new Canvas(500, 500);
	displayMode('centered');
	world.gravity.y = 10;

}

function draw() {
	if(!game_over){
		background('skyblue');
		display()
		controls()
		wallCols()
		paddleCols()
		objectCols()
	}

	if(game_over){
		background('black')
		paddle.vel.x = 0
	}

}

function display(){
	if(!done){
		ball = new Sprite();
		ball.diameter = 20;
		

		paddle = new Sprite(width/2,height - 50, 75,20,'k')

		for(i=0; i<obsNum; i++){
			if(obsNum<=12){
				objectArray.push(new Sprite(width/obsNum * i + 25, 15, width/10,15,'k'))
			}
			else if(obsNum > 12){
				objectArray.push(new Sprite(width/(obsNum/2) * (i/2) + 25, 20, width/obsNum,15,'k'))
				objectArray.push(new Sprite(width/(obsNum - obsNum/2) * (i/2) + 25, 20 + obsNum + gap, width/obsNum,15,'k'))
			}
		}

		done = true
	}

}

function controls(){
	if(kb.pressing('left')){
		paddle.vel.x = -4
	}
	else if(kb.pressing('RIGHT')){
		paddle.vel.x = 4
	}
	else{
		paddle.vel.x = 0
	}
}

function wallCols(){
	///////walls
	if(ball.y >= height){
		game_over = true
	}
	else if(ball.y <= 0){
		ball.vel.y = 1
	}

	if(ball.x <=0){
		ball.vel.x = 3
	}
	if(ball.x >= width){
		ball.vel.x = -3
	}
	/////paddle wall

	if(paddle.x + paddle.width/2 >= width){
		paddle.vel.x = -1
	}
	if(paddle.x - paddle.width/2 <= 0){
		paddle.vel.x = 1
	}
}

function paddleCols(){
	//////paddle
	if(ball.collides(paddle)&&!first_collision){
		ball.vel.x = 3
		first_collision = true
	}
	if(ball.collides(paddle)){
		ball.vel.x = random(-3,3)
		ball.vel.y = -12
	}

}

function objectCols(){
	for(i=0; i<objectArray.length; i++){
		if(ball.collides(objectArray[i])){
			objectArray[i].overlap(allSprites)
			objectArray[i].overlap(ball)
			objectArray[i].overlap(paddle)
			objectArray[i].collider = 'dynamic'
			ball.bounciness = 1
		}
		else{
			ball.bounciness = 0
		}
	}
}
