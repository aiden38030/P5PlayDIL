let ball;

function setup() {
	new Canvas(500, 500);
	displayMode('centered');

	ball = new Sprite(width,50,50,50);
    ball.vel.y = 5
    ball.vel.x = -5
	
}

function draw() {
	background('skyblue');
    HitsWall()

}

function HitsWall(){
    if(ball.x >= width ){
        ball.vel.x = random(-2,-5)
    }
    if(ball.x <= 0){
        ball.vel.x = random(2,5)
    }
    if(ball.y >= height){
        ball.vel.y = random(-2,-5)
    }
    if(ball.y <= 0){
        ball.vel.y = random(2,5)
    }
}
