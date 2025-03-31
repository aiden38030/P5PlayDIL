let player,map,walls,platforms

// function preload(){
// 	groundImg = loadImage('code/square.png')
// }


function setup() {
	new Canvas(500, 500);
	displayMode('centered');
	world.gravity.y = 10
	
	walls = new Group()
	walls.color = 'red'
	walls.tile = '='
	walls.w = 50
	walls.h = 50
	walls.collider = 's'

	map = new Tiles(
		[
			'................. ',
			'................. ',
			'................. ',
			'======.......==== ',
			'======..==.====== ',
			'========...====== ',
			'===..=.....====== ',
			'=..===.....====== '
		],
		50,
		50,
		walls.w + 2,
		walls.h+2
		)


	player = new Sprite(100,100,20,20,'d')


}

function draw() {
	background('skyblue');

	if(kb.pressing('a')){
		player.vel.x = -2
	}
	if(kb.pressing('d')){
		player.vel.x = 2
	}
	if(kb.pressing(' ')){
		player.vel.y = -2
	}


}
