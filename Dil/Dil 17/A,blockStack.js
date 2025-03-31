let block;

function setup() {
	new Canvas(500, 500);
	displayMode('centered');
    world.gravity.y = 10

	block = new Sprite(width,100,50,50,'k');
    block.vel.x = -2
    floor = new Sprite(width/2,height,70,70,'k')
}

function draw() {
	background('skyblue');



}function click()
function keyPressed(){
    if(key === ' '){
        block.vel.x = 0
        block.collider = 'd'
        block = new Sprite(width,100,50,50,'k');
        block.vel.x = -2
    }
}
