let player,map,walls,platform,dirt,grass,coin
let jump_count = 0
let points = 0

// function preload(){
// 	groundImg = loadImage('code/square.png')
// }


function setup() {
	new Canvas(500, 500);
	displayMode('centered');
	world.gravity.y = 10
	border = new Sprite(0,height + 30,20,height*2,'s')
	border.color = 'clear'
	


	//////blocks/////////////
	dirt = new Group()
	dirt.color = 'brown'
	dirt.tile = 'n'
	dirt.w = 50
	dirt.h = 50
	dirt.collider = 's'

	grass = new Group()
	grass.color = 'green'
	grass.tile = 'g'
	grass.w = 50
	grass.h = 50
	grass.collider = 's'
	grass.friction = 0

	platform = new Group()
	platform.color = 'grey'
	platform.tile = 'B'
	platform.w = 50
	platform.h = 50
	platform.collider = 's'

	coin = new Group()
	coin.color = 'gold'
	coin.diameter = 5
	coin.tile = 'o'
	coin.w = 50
	coin.h = 50
	coin.collider = 's'

	/////map//////////////////
	map = new Tiles(
		[
			'........................................',
'........................................',
'........................................',
'........................................',
'........................................',
'........................................',
'........................................',
'........................................',
'........................................',
'.......................................',
'........................................',
'.......................................',
'........................................',
'.......................................',
'........................................',
'........................................',
'........................................',
'........................................',
'......gg.....................ggg........',
'...ggggggg..............gg.gggggg.......',
'ggggggggggggg.........gggggggggggggg....',
'gggggggggggggggg...ggggggggggggggggggggg',
'ggggnnnnnnnggggggggggggnnnnnnnngggnnnnnn',
'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn'
		],
		15,
		15,
		dirt.w + 2,
		dirt.h + 2
		)



	
	//////player////////
	player = new Sprite(100,height*2,40,30,'d')
	player.rotationLock = true
	player.drag = 2

	//////follower///////
	follower = new Sprite(player.x + 175, player.y);
	follower.diameter = 10;
	follower.collider = 'k'
	follower.moveTo(player)
	follower.overlap(player)
	


}

function draw() {
	background('skyblue');

	camera.on()
	cameraFollow()
	collisions()
	controls()


	////text////
	fill("black")
	text(points,follower.x - (width/2 + 50),follower.y - (height/2 + 50))
	
}


function controls(){
	if(kb.pressing('a')||kb.pressing('LEFT')){
		player.vel.x = -2
	}
	if(kb.pressing('d')|| kb.pressing('RIGHT')){
		player.vel.x = 2
	}
	if(kb.pressed(' ')&&jump_count < 2){
		player.vel.y = -6
		jump_count += 1
	}
}

function cameraFollow(){
	follower.speed = followerSpeed()
	follower.moveTo(player)
	camera.position = follower
}

function followerSpeed(){
	distanceSquared = (((follower.y - player.y)**2)+((follower.x - player.x)**2))
	distance = Math.sqrt(distanceSquared) 
	if(distance > 100){
		speed = player.speed
  	}
	else{
		speed = distance*0.5

	}
	return speed

}

function collisions(){
	if(player.x <= width - 175){
		follower.vel.x = 0
	}
	if(player.x <= 0 + 20){
		player.x = 0 + 20
	}

	if(player.collides(grass)||player.collides(platform)){
		jump_count = 0
	}

	for(co of coin){
		if(player.collides(co)){
			co.remove()
			point += 1
		}
	}
	
}
