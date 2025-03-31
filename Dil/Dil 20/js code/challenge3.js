let ball;

function setup() {
	new Canvas(500, 500);
	displayMode('centered');

	ball = new Sprite();
	ball.diameter = 50;

    fruits = new Group()
    fruits.diameter = 20
    fruits.collider ='d'



}

function draw() {
	background('skyblue');

	ball.moveTo(mouse)

    spawnFruits()
    collisions()
}


function spawnFruits(){
    if(fruits.length<10){
        new fruits.Sprite(random(0,width),random(0,height))
    }
}

function collisions(){
    for(fruit of fruits){
        if(fruit.collides(ball)){
            score +=1
            fruit.remove()
        }
    }
}