let ball;
let score = 0

function preload() {
    footballImg = loadImage('football.png')
    // goalImg = loadImage('')
}


function setup() {
	new Canvas(500, 800);
	displayMode('centered');
    background('black')

    boarder = new Sprite(0,height,width*2, 5,'s')
    


	ball = new Sprite();
    ball.image = footballImg
    ball.image.filter(INVERT)
    ball.scale = 0.05
    ball.x = width/2
    ball.y = height - height/12
    ball.bounciness = 1

    goal = new Sprite(width/2,100,width/2,height/12,'s')
    goal.color = 'white'
}

function draw() {
    ///////background & outline
    background('black')
    noFill()
    stroke(555)
    strokeWeight(4)
    rect(0,0,width,height)
    strokeWeight(0)



    ///////////moving ball
	if (mouse.presses()) {
		ball.speed = 8;
		ball.moveTo(mouse);
	}

    //////////

    if(ball.collides(goal)){
        score += 1
    }
    
    fill('white')
    textAlign(CENTER,CENTER)
    text(`score: ${score} `,width/2,height/2)
    textSize(40)

    
}
