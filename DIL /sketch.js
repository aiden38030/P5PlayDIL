let car,floor,axelRear,axelFront, wheelsFront,wheelsRear;

function setup() {
	new Canvas(windowWidth, windowHeight);
	displayMode('centered');
	world.gravity.y = 10


	floor = new Sprite(0,canvasHeight, canvasWidth, canvasHeight)
	floor.color = 'black'

	car = new Sprite();
	car.collider = 'd'
	
	axelFront = new WheelJoint(car,wheelsFront)
	axelRear = new WheelJoint(car,wheelsRear)
}

function draw() {
	background('skyblue');
	controls()

	camera.x = car.x + 150
	camera.y = car.y
}

function controls(){
	if(kb.pressing('left')) axelRear.speed--;
	else if(kb.pressing('right')) axelRear.speed++;
	else if(kb.pressing('down')) axelRear.speed = 0;
	else axelRear.enableMotor = false
}
