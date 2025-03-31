let player,zombies,bullets,blood,ammoBox///object variables
let health,ammo,score///variables for display
let playing///boolean for playing
let zombieImg,playerImg,bgImg,bulletImg,zombieFont,ammoBoxImg//graphical parts



//////preload///////
function preload(){
	zombieImg = loadImage('images/zombieIm.png')
	playerImg = loadImage('images/playerImg.png')
	bgImg = loadImage('images/zg background.png')
	bulletImg = loadImage('images/hand_gun_bullet.png')
	ammoBoxImg = loadImage('images/amo.png')
	healthPackImg = loadImage('images/medical_items_sheet.png')
	zombieFont = loadFont('images/Zombie.tff')
}

//////update///////
function update(){
	if(playing){
		move()
		moveZombie()
		shoot()
		for(b of bullets){
			for(z of zombies){
				if(b.collides(z)){
					b.remove()
					z.remove()
					score += 1
				}
			}
		}
		if(health <= 0){
			let name = prompt('whats your name')
			playing = false
		}
	}
}


//////setup///////
function setup() {
	new Canvas(windowWidth, windowHeight);
	displayMode('centered');
	playing = true
	health = 100
	ammo = 100
	score = 0

	player = new Sprite()
	player.color = 'blue'
	player.collider = 'd'
	player.w = 313
	player.h = 206
	player.spriteSheet = playerImg
	player.addAni({
		move: {row: 0, frames: 18},
		shoot: {row: 0, frames: 12}
	})
	player.scale = 0.5
	player.w = 100
	player.h = 100

	zombies = new Group()
	zombies.color = 'red'
	zombies.w = 288
	zombies.h = 318
	zombies.spriteSheet = zombieImg
	zombies.addAnis({
		move: {row:0, frames:14},
		attack: {row:1, frames:5},
	})
	zombies.scale = 0.5
	zombies.w = 100
	zombies.h = 100

	bullets = new Group()
	bullets.w = 6
	bullets.h = 10
	bullets.img = bulletImg


	ammoBox = new Group()
	ammoBox.w = 6
	ammoBox.h = 10
	ammoBox.img = ammoBoxImg
	ammoBox.scale = 0.5

	healthPack = new Group()
	healthPack.w=288
	healthPack.h = 318
	healthPack.spriteSheet = healthPackImg
	healthPack.addAnis({
		spawn: {row:0, frames: 1},
	})
	healthPack.scale = 1
	healthPack.w = 100
	healthPack.h = 100


	blood = new Group()
	blood.radius = 2
	blood.color = 'red'
	blood.opacity = 0.5
	blood.life = 30
	blood.collider = 'n'

	player.overlaps(bullets)
	player.overlaps(blood)
	player.overlapping(zombies,loseHealth)
	setInterval(spawn_zombie,1000)
	if(ammoBox.length<3){
		setInterval(spawn_ammoBox, random(5000,10000))
	}
	if(healthPack.length<3){
		setInterval(spawn_healthPack, random(5000,10000));
	}

}


//////draw///////
function draw() {
	if(playing){
		background(bgImg)
		camera.on()
		camera.x = player.x
		camera.y = player.y
		HUD()
		collisions()
	}
	if(!playing){
		allSprites.removeAll()
		background("black")
		fill('red')
		textSize(100)
		textFont(zombieFont)
		textAlign(CENTER, CENTER);
  		text('GAME OVER', width / 2, height / 2)
	}
	
}



//////////////////functions///////////////////
function spawn_zombie(){
	if(playing){
		side = floor(random(1,5))
		if(side == 1){
			new zombies.Sprite(random(width-15,width),random(height))
		}
		else if(side == 2){
			new zombies.Sprite(random(-15),random(height))

		}
		else if(side == 3){
			new zombies.Sprite(random(width),random(height-15,height))

		}
		else{
			new zombies.Sprite(random(width),random(-15))

		}
	}

}

function move(){
	if(kb.pressing('a')){
		player.vel.x = -2
	}
	else if(kb.pressing('d')){
		player.vel.x = 2
	}
	else{
		player.vel.x = 0
	}

	if(kb.pressing('w')){
		player.vel.y = -2
	}
	else if(kb.pressing('s')){
		player.vel.y = 2
	}
	else{
		player.vel.y = 0
	}
	player.rotateMinTo(mouse,10)
}

function moveZombie(){
	if(playing){
		for(z of zombies){
			z.rotation = z.angleTo(player)
			z.direction = z.rotation
			z.speed = 1
			z.changeAni('move')
		}
	}

}

function shoot(){
	if(playing){
		if(ammo > 0){
			if(mouse.released()){
				let b = new bullets.Sprite(player.x,player.y)
				b.direction = b.angleTo(mouse)
				b.rotation = b.direction + 180
				b.speed = 3
				ammo -= 1
			}
		}
	}
}

function HUD(){
	textSize(30)
	textFont(zombieFont)
	text('HP: '+ floor(health),50,100)
	text('Score: '+ score,200,100)
	text('Ammo:'+ ammo,350,100)

}

function loseHealth(p,z){
	z.changeAni('attack')
	health -=0.1
	let b = new blood.Sprite(p.x,p.y)
	b.vel.x = random(-1,1)
	b.vel.y = random(-1,1)
}

function spawn_ammoBox(){
	if(playing){
		new ammoBox.Sprite(random(width),random(height))
	}
}

function spawn_healthPack(){
	if(playing){
		new healthPack.Sprite(random(width),random(height))
		//healthPack.changeAni('spawn')
	}
}

function collisions(){
	for(box of ammoBox){
		if(player.collides(box)){
			box.remove()
			ammo += floor(random(20,35))
		}
	}

	for(h of healthPack){
		if(player.collides(h)){
			h.remove()
			health += floor(random(25,50))
		}
	}
}
