let ball;

function setup() {
	new Canvas(500, 500);
	displayMode('centered');

	ball = new Sprite();
	ball.diameter = 50;
	ball.speed = 3

	zombies = new Group()
	zombies.diameter = 25
	zombies.x = 0
	zombies.y = 0
	zombies.collider = 'd'
}

function draw() {
	background('skyblue');

	ball.moveTo(mouse)
	ball.speed = 3

	zombieSpawn()
	zombieMove()

	collision()
}

function zombieMove(){
	for(zomb of zombies){
		zomb.speed = 1
		zomb.moveTo(ball)
	}
}

function zombieSpawn(){
	if(zombies.length<5){
		new zombies.Sprite(random(0,width), random(0,height))
	}
}

function collision(){
	for(zomb of zombies){
		if(zomb.collides(ball)){
			zomb.remove()
			
		}
	}
}