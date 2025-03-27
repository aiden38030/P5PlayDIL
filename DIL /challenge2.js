let floor, ball, cutter, rope;

function setup() {
	new Canvas(windowWidth, windowHeight);
	displayMode('centered');
	world.gravity.y = 10


	floor = new Sprite(0,canvasHeight, canvasWidth, canvasHeight)
	floor.color = 'black'

	rope = new Sprite(width/2,0,5,20)

	ball = new Sprite()
	ball.diameter = 15

	new GlueJoint(ball,rope)

	cutter = new Sprite(0,0)
	cutter.display = false

}

function draw() {
	background('skyblue');
	controls()
	colliders()

	
}

function controls(){
	if(mouse.dragged()){
		cutter.x = mouse.x
		cutter.y = mouse.y
	}
}

function colliders(){
	if(cutter.collides(rope)){
		if(ball.joints[0]){
			ball.joints[0].remove()
		}
	}
}


