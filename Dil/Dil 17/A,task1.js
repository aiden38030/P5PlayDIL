let ball;

function setup() {
	new Canvas(500, 500);
	displayMode('centered');
    world.gravity.y = 10

	ball = new Sprite();
	ball.diameter = 50;

    floor = new Sprite(width,height,width*2,50,'k')
}

function draw() {
	background('skyblue');
   
}

function keyPressed(){
    if(key === 'w'){
        ball.y += 100
    }
    if(key === 's'){
        ball.x -= 50
    }
}