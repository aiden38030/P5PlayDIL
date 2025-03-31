let ball;

function setup() {
	new Canvas(500, 500);
	displayMode('centered');
	world.gravity.y = 10

	player = new Sprite();
	player.diameter = 50;

	floor = new Sprite(width,height,width*2,50,'s')
}

function draw() {
	background('skyblue');
	controller()
}


function controller(){
	if(kb.pressing('a')){
		player.vel.x = -2
	}
	else if(kb.pressing('d')){
		player.vel.x = 2
	}
	else{
		player.vel.x = 0
	}
}

function keyPressed(){
	if(key === ' '){
		player.vel.y = player.diameter/2
	}
}
