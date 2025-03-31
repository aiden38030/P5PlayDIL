let car, grass1, grass3, grass5, grass9, grass13, grass11, finishLine
let grassImg1, grassImg3, grassImg5, grassImg9,grassImg11, grassImg13
let laps = 0
let tileSize = 50

function preload(){
	// for(i=0; i<15; i++){
	// 	grassImg(i) = loadImage(`images/land_grass${i}`)
	// }
	
	grassImg1 = loadImage(`images/land_grass01.png`)
	grassImg3 = loadImage(`images/land_grass03.png`)
	grassImg5 = loadImage(`images/land_grass05.png`)
	grassImg9 = loadImage(`images/land_grass09.png`)
	grassImg13 = loadImage(`images/land_grass13.png`)
	grassImg11 = loadImage(`images/land_grass11.png`)
	backgroundSong = loadsound(`images/background.mp3`)
}

function setup() {
	new Canvas(500,500);
	displayMode('centered');
	allSprites.pixelPerfect = true;

	grass1 = new Group()
	grass1.image = grassImg1
	grass1.collider = 's'
	grass1.tile = 'e'
	grass1.w = tileSize
	grass1.h = tileSize
	grass1.friction = 0
	grass1.scale = 1

	grass3 = new Group()
	grass3.image = grassImg3
	grass3.collider = 's'
	grass3.tile = 'a'
	grass3.w = tileSize
	grass3.h = tileSize
	grass3.friction = 0
	grass3.scale = 1

	grass5 = new Group()
	grass5.image = grassImg5
	grass5.collider = 's'
	grass5.tile = 'b'
	grass5.w = tileSize
	grass5.h = tileSize
	grass5.friction = 0
	grass5.scale = 1

	grass9 = new Group()
	grass9.image = grassImg9
	grass9.collider = 's'
	grass9.tile = 'c'
	grass9.w = tileSize
	grass9.h = tileSize
	grass9.friction = 0
	grass9.scale = 1

	grass13 = new Group()
	grass13.image = grassImg13
	grass13.collider = 's'
	grass13.tile = 'd'
	grass13.w = tileSize
	grass13.h = tileSize
	grass13.friction = 0
	grass13.scale = 1


	grass11 = new Group()
	grass11.image = grassImg11
	grass11.collider = 's'
	grass11.tile = 'g'
	grass11.w = tileSize
	grass11.h = tileSize
	grass11.friction = 0
	grass11.scale = 1
	

	finishLine = new Group()
	finishLine.colour = 'white'
	finishLine.collider = 's'
	finishLine.tile = '*'
	finishLine.w = tileSize
	finishLine.h = tileSize/3
	finishLine.friction = 0
	finishLine.scale = 1


	car = new Sprite()
	car.diameter = 15
	car.collider = 'd'
	car.rotationLock = true
	car.overlap(finishLine)

	tilemap = new Tiles(
		[
		"gggecccccccccccccccccccccccggggggggggggg",
		"ggeb.......................acggggggggggg",
		"geb..........................accgggggggg",
		"gb......adddddddb...............aggggggg",
		"gb....accccccccggddddb...........agggggg",
		"gb.............accgggggb.........agggggg",
		"ggb...............agggggb.........aggggg",
		"gggddddddb.........agggggddb.......agggg",
		"ggggggggecccb......aggggggggdb.....agggg",
		"gggggeccb.........aggggggggggb......aggg",
		"gggecb..........aggggggggggggb.......agg",
		"ggeb..........agggggggggggggggb......agg",
		"ggb.........agggggggggggggggggb......agg",
		"ggb.....aggggggggggggggggggggb......aggg",
		"ggb....aggggggggggggggggggggb......agggg",
		"ggb.....aggggggggggggggggggb.....agggggg",
		"gggb.....aggggggggggggggggb.....aggggggg",
		"ggggb......acccccccccccccb.....agggggggg",
		"gggggb........................aggggggggg",
		"gggggggb.....................agggggggggg",
		"ggggggggb..................agggggggggggg",
		"ggggggggggb..............agggggggggggggg",
		"gggggggggggddddddddddddddggggggggggggggg",
		"gggggggggggggggggggggggggggggggggggggggg",
	],
	tileSize,
	tileSize,
	tileSize - 2,
	tileSize - 2)
	
	
}

function draw() {
	clear()
	background('skyblue');
	backgroundSong.play()
	camera.on()
	camera.position = car
	carMove()
	lap()
	allSprites.draw()
	camera.off()
	miniMap()


	// textSize(15)
	// fill('black')
	// text(laps, 50,50)

}

function carMove(){
	if(kb.pressing('w')){
		car.direction = 270
		// car.speed=2
		
	}
	else if(kb.pressing('s')){
		car.direction = 90
		// car.speed=2
		
	}
	else if(kb.pressing('a')){
		car.direction = 180
		// car.speed=2
		
	}
	else if(kb.pressing('d')){
		car.direction = 360
		// car.speed=2

		
	}
	if(kb.pressing('space')){
		if(car.speed < 3){
			car.speed += 1
		}
	}
	else if(car.speed>0){
		car.speed -= 0.05
	}

}

function lap(){
	for(l of finishLine){
		if((car.x > l.x - 20 || car.x< l.x + 20) && (car.y > l.y - 20 || car.y< l.y + 20) ){
			laps+=1
		}
    }
}

function miniMap(){
	//rect(0,0,100,100)
	for(t of tilemap){
		if(t.tile =='g'){
			fill('green')
		}
		else if(t.tile == '*'){
			fill('white')
		}
		else if(t.tile == '.'){
			fill('grey')
		}
		else{
			fill('black')
		}
		rect(t.x/10, t.y/10, width/100, height/100)
		//fill(0,0,255)
		rect(car.x/10, car.y/10, width/100, height/100)
	}
}
