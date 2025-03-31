let player,ghosts,walls,wall;


/////10 by 10 map
let map = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0,0,0,0],
[1,1,1,1,1,1,1,2,2,2,2,1,0,0,0,0,0,0,0,0],
[0,0,0,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]

let rows = map[0].length
let cols = map.length

function setup() {
	new Canvas(500, 500);
	displayMode('centered');

	ghosts = new Group()
	ghosts.diameter = 20
	ghosts.collider = 'd'

	// Create walls group
	walls = new Group();
	walls.collider = 's'
	walls.height = (height*2)/rows
	walls.width = (width*2)/cols
	walls.x = 25
	walls.y = 25
	walls.shapeColor = color(255,0,0)
	createWall()
	//walls.overlap(player)

	player = new Sprite(12.5,height/2-12.5);
	player.diameter = 22;
	player.collider = 'd'
	player.bounciness = 0
	
	
}

function draw() {
	background('white');

	///player
	movement()
	colliders()




	
}


function movement(){
	player.overlap(allSprites)
	if(keyIsDown(LEFT_ARROW)){
		player.vel.x = -2
		player.vel.y = 0
	}
	if(keyIsDown(RIGHT_ARROW)){
		player.vel.x = 2
		player.vel.y = 0
	}
	if(keyIsDown(DOWN_ARROW)){
		player.vel.y = 2
		player.vel.x = 0
	}
	if(keyIsDown(UP_ARROW)){
		player.vel.y = -2
		player.vel.x = 0
	}
}

function createWall() {
	for(i = 0; i<rows;i++){
		for(j=0; j<cols;j++){
			if(map[i][j] == 0){
				new walls.Sprite(j*25+(walls.width/2),i*25+(walls.height/2))
			}
			else if(map[i][j] == 2){
				new walls.Sprite(j*25+(walls.width/2),i*25+(walls.height/2))
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
			player.bounciness = 1
			player.vel.y = 0
			player.vel.x = 0
		}
	}
}