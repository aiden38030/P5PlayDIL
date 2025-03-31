let player
let lastFrameUpdate = 0
let step
let StepArray = []
let backgroundImg
let jump_count = 0

function preload(){
	backgroundImg = loadImage('background.png')
}



//10x10 map
let map = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]
	
	let rows = map[0].length
	let cols = map.length



function setup() {
	new Canvas(600, 600);
	displayMode('centered');
	world.gravity.y = 10


	//player
	player = new Sprite();
	player.diameter = 50;
	player.rotationLock = true 
	player.friction = 1
    player.drag = 0.7
	

	//follower
	follower = new Sprite();
	follower.diameter = 10;
	follower.collider = 'k'
	follower.moveTo(player)
	follower.overlap(player)
	

	// Create walls group
	walls = new Group();
	walls.collider = 's'
	walls.height = (height)/rows
	walls.width = (width+50)/cols
	walls.x = 50
	walls.y = 50
	walls.shapeColor = color(255,0,0)
	createWall()
	   
}

function draw() {
	background('skyblue');
	world.gravity.y = 10
	
/////////////////camera follow
	camera.on()
	cameraFollow()
	controls()
	colliders()
	
}

function cameraFollow(){
	follower.speed = followerSpeed()
	follower.moveTo(width/2,player.y)
	camera.position = follower
}

function controls(){
	/////jump
	if(kb.pressed(' ')){
		if(jump_count < 2){
			player.vel.y = -10
			jump_count += 1
		}
	}

	if(mouse.clicked()){
		if(jump_count < 2){
			player.vel.y = -10
			jump_count += 1
		}
	}

	/////movement
	if(kb.pressing('right')&& player.vel.x < 5){
		player.vel.x +=0.5
	}
	else if(kb.pressing('left')&& player.vel.x > -5){
		player.vel.x -= 0.5
	}

	if(kb.pressed('p')){
		lastFrameUpdate = frameCount
		step = new Sprite(player.x, player.y + player.diameter, 50,20,'k')
		StepArray.push(step)
	}
	if(frameCount >= lastFrameUpdate + 60 && StepArray.length > 0){
		for(i = 0; i<StepArray.length;i++){
			StepArray[i].collider = 'd'
		    StepArray[i].overlap(allSprites)
		    lastFrameUpdate = frameCount
		}
	}

}

function followerSpeed(){
	distanceSquared = (((follower.y - player.y)**2)+((0)**2))
	distance = Math.sqrt(distanceSquared) 
	if(distance > 100){
		speed = player.speed
  	}
	else{
		speed = distance*0.5

	}
	return speed

}

function createWall() {
	for(i = 0; i<rows;i++){
		for(j=0; j<cols;j++){
			if(map[i][j] == 1){
				new walls.Sprite(j*walls.width,i*(walls.height*4))
			}
			else if(map[i][j] == 2){
				new walls.Sprite(j*walls.width,i*walls.height)
			}
		}
	}
	for(wall of walls){
		wall.color = 'red'
	}
  }

function colliders(){
	for(wall of walls){
		if(player.collides(wall)){
			if(player.vel.x != 0){
				
			}
			jump_count = 0
			
		}
	}
}