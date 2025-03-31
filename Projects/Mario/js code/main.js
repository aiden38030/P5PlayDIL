let map, ground, brick, questionBox, pipe, goomba, mario, coins = 0;
let tileSize = 10
let brickImg, groundImg, qImg, pipeImg, goombaImg, marioImg
let playing = false

function preload(){
	brickImg = loadImage('image/brick.png')
	groundImg = loadImage('image/ground.png')
	qImg = loadImage('image/question2.png')
	pipeImg = loadImage('image/pipeleft.png')
	goombaImg = loadImage('image/goomba.png')
	marioImg = loadImage('image/Mario.png')
}

function setup(){
	new Canvas(500,500)
	displayMode('centered')
	allSprites.pixelPerfect = true
	world.autoStep = false
	world.gravity.y = 10


//////////////////////blocks///////////////////////
	walkable = new Group()
	ground = new walkable.Group()
	ground.collider = 's'
	ground.image = groundImg
	ground.tile = '='
	ground.w = tileSize
	ground.h = tileSize - 4
	ground.friction = 0

	brick = new walkable.Group()
	brick.collider = 's'
	brick.image = brickImg
	brick.tile = 'b'
	brick.w = tileSize - 5
	brick.h = tileSize - 5

	questionBox = new walkable.Group()
	questionBox.collider = 's'
	questionBox.image = qImg
	questionBox.tile = '?'
	questionBox.w = tileSize - 5
	questionBox.h = tileSize - 5

	pipeLeft = new walkable.Group()
	pipeLeft.collider = 's'
	pipeLeft.image = pipeImg
	pipeLeft.tile = 'L'
	pipeLeft.w = tileSize
	pipeLeft.h = tileSize

	pipeRight = new walkable.Group()
	pipeRight.collider = 's'
	pipeLeft.image = 'pipeRight.png'
	pipeRight.tile = 'R'
	pipeRight.w = tileSize
	pipeRight.h = tileSize

	pipeTL = new walkable.Group()
	pipeTL.collider = 's'
	pipeTL.image = 'pipeTopLeft.png'
	pipeTL.tile = 'l'
	pipeTL.w = tileSize
	pipeTL.h = tileSize

	pipeTR = new walkable.Group()
	pipeTR.collider = 's'
	pipeTR.image = 'pipeTopRight.png'
	pipeTR.tile = 'r'
	pipeTR.w = tileSize
	pipeTR.h = tileSize

//////////////////enemys/////////////////
	goomba = new Group()
	goomba.collider = 'd'
	goomba.rotationLock = true
	goomba.spriteSheet = goombaImg
	goomba.tile = 'g'
	goomba.w = 16
	goomba.h = 16
	goomba.anis.frameDelay = 8
	goomba.addAnis({
		run: { row: 0, frames:2},
	})
	goomba.friction = 0
	goomba.mass = 5
	goomba.vel.x = 5
	goomba.w = tileSize
	goomba.h = tileSize



////////////////player/mario////////////////
	mario = new Sprite()

	mario.tile = 'm'
	mario.rotationLock = true
	mario.spriteSheet = marioImg
	mario.rotationLock = true
	mario.anis.frameDelay = 8
	mario.addAnis({
		run: {row:0, frame:3},
		stand:{row:0, frame:1},
	})
	mario.scale = 1.5
	mario.w = 16
	mario.h = 16
	mario.rotationLock = true
	mario.bounciness = 0
	mario.friction = 0
	mario.overlaps(goomba, reset)
	mario.collides(questionBox, getCoin);

	mario.debug = true

	groundSensor = new Sprite(mario.x, mario.y + (mario.h/2)+5, mario.w -2, 1)
	groundSensor.mass = 0.01
	groundSensor.collider = 'n'
	groundSensor.visable = false
	groundSensor.overlaps(goomba, (s,g) => {
		g.remove()
	})
	let j = new GlueJoint(mario, groundSensor)
	j.visable = false


	/////////////MAP/////////////
	tilemap = new Tiles([
		'........................................................................................................................................................................................................................................................................................',
		'........................................................................................................................................................................................................................................................................................',
		'...................................................................................g....................................................................................................................................................................................................',
		'...................................................................................bbbbbbbb...bbb?.......................?.............bbb.....b??b.....................................................................................................................................',
		'.......................?.............................................................................................................................................................................................bb.................................................................',
		'....................................................................................................................................................................................................................bbb.................................................................',
		'...................................................................................................................................................................................................................bbbb.................................................................',
		'................?....b?b?b...................................................b?b.................?.....b?.....bb......?..?..?......b............bb................................................................bbbbb.................bb..............................................',
		'..............................................lr.........lr.............................................................................................b..b............bb..b...................................bbbbbb................bbbb.............................................',
		'......................................lr......LR.........LR............................................................................................bb..bb..........bbb..bb..............bb?b...............bbbbbbb...............bbbbbb............................................',
		'...........................lr.........LR......LR.........LR...........................................................................................bbb..bbb........bbbb..bbb.......lr...................lr.bbbbbbbb...............bbbbbb............................................',
		'......m..............g.....LR.........LR.....gLR.........LR..........................................................................................bbbb..bbbb......bbbbb..bbbb......LR............g.g....LRbbbbbbbbb.........b.....bbbbbb............................................',
		'======================================================================..===============...=================================================================================..===========================================================================================================',
		'======================================================================..===============...=================================================================================..===========================================================================================================',
	],
	tileSize,
	tileSize,
	tileSize - 2,
	tileSize - 2)
}

function update(){
	if(playing){
		moveEnemies()
		moveMario()
		//if mario goes out of bounds
		if(mario.y < -50 || mario.y > 200){
			reset()
		} 
		world.step() // playes the game loop
	}
	else{
		if(kb.presses('space')){
			playing = true
			world.gravity.y = 10
		}
	}
}


function draw(){
	background(92,148,252)
	camera.zoom = 2
	camera.x = mario.x + 100
	camera.y = mario.y
	if(!playing){
		text('press space to start', 50,60)
	}
	if(!playing){
		moveEnemies()
		moveMario()
		let minCameraX = canvas.w / 2 - 16
		if(mario.x < minCameraX){
			camera.x = minCameraX
		}
		else{
			camera.x = mario.x
		}
	}
}



function moveMario(){
	if(kb.pressing('a')){
		mario.vel.x = -2
		camera.x -= 2
		mario.ani = 'run'
		mario.mirror.x = true
	}
	else if(kb.pressing('d')){
		mario.vel.x = 2
		camera.x += 2
		mario.ani = 'run'
		mario.mirror.x = false
	}
	else{
		mario.ani = 'stand'
		mario.vel.x = 0
	}
	if(kb.presses('space')&&(groundSensor.overlapping(walkable))){
		mario.vel.y = -5
	}
}
function moveEnemies(){
	for(g of goomba){
		console.log(g.vel.x)
		if(g.collides(pipeLeft)){
			g.vel.x *= -1
		}
		g.speed = 0.4
	}
}

function getCoin(mario, box){
	if(mario.vel.y > 0){
		box.image = brickImg
		if(!box.touched){
			coins += 1
			box.touched = true
			//play sound?
		}
	}
}


function reset(){
	mario.x = 16
	mario.y = 75
	mario.speed = 0
	mario.playing = false
}