let player, alien, bullet;
let level = 0
let gap = 120
let time = true
let direction = 1

let bulletArray = []

function setup() {
	new Canvas(500, 500);
	displayMode('centered');
 // world.gravity.y = 10

    player = new Sprite(width/2, height - 50, 100,25,'d');

    alien = new Group()
    alien.diameter = 50
    alien.x = width/2
    alien.y = 50
    alien.collider = 'd'
    alien.amount = 5

    new alien.Sprite()
    alien.vel.x = 1

    bullet = new Group()
    bullet.vel.y = 5
    bullet.x = player.x
    bullet.y = player.y
    bullet.diameter = 10
    bullet.collider = 's'

    changeXCoordinate(alien,width/alien.length - alien.diameter, gap)

}

function draw() {
	background('skyblue');

  //levelSetUp()
  shift_aliens(direction)
  

  // Update bullet position
  for(buls of bulletArray){
    buls.y -= bullet.vel.y
    buls.draw()
  }

  collisions()

}

function keyPressed() {
  if (key === ' ') {
    bul = new bullet.Sprite()
    bul.x = player.x
    bulletArray.push(bul)
  }
  if (key === 'a') {
    player.vel.x -= 2
    
  }
  if (key === 'd') {
    player.vel.x = 2
  }
}

function keyReleased() {
  if (key === 'a' || key === 'd') {
    player.vel.x = 0;
  }
}

function collisions(){
  for(buls of bulletArray){
    for(als of alien){
      als.collider = 'd'
      if(buls.collides(als)){
        als.remove()
        buls.remove()
      }
    }
  }
}

function changeXCoordinate(group, newX,gap) {
//if(group.length <= 5){
    for (let i = 0; i < group.length; i++) {
        group[i].position.x = newX + ((i*alien.diameter) + gap);
    }
  //}
  // else if(group.length <= 20){
  //   for (let i = 0; i < group.length; i++) {
  //     for(let j = 0; j<10;j++){
  //       group[i].position.x = newX + ((i*alien.diameter) + gap);
  //     }
  //     group[i].position.x = group[i-10];
  //     group[i].position.y += alien.diameter
  // }
  // }
}

function shift_aliens(direction){
  alien_last = alien.length - 1
  if(alien[0].position.x < 0 + alien.diameter/2){
    alien.vel.x = direction
    alien.y += 20
  }
  else if(alien[alien_last].position.x > width - alien.diameter/2){
    alien.vel.x = -direction
    alien.y += 20
  }
}