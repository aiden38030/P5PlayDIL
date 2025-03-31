let ball,coin;
let money = 0
let coinArray = []
let coinsAmount = 5

function setup() {
	new Canvas(500, 500);
	displayMode('centered');

	ball = new Sprite();
	ball.diameter = 50;
    ball.rotationLock = true
    ball.friction = 100
    ball.bounciness = 0

    coins()
}

function draw() {
	background('skyblue');
       

	if (mouse.presses()) {
		ball.speed = 10;
		ball.moveTo(mouse);
	}
    
    collisions()
    
    fill('black')
    text(`money: ${money}`,50,50)
    noFill()

}


function coins(){
    for(i = 0; i<coinsAmount; i++){
        coin = new Sprite(random(50,height),random(50,width),50,50,'k')
        coin.diameter = 20
        coinArray.push(coin)
    }
}

function collisions(){
    for(cn of coinArray){
        if(ball.collides(cn)){
            money += 1
           //coinArray[i].overlap(ball)
           //ball.overlap(coinArray[i])
           cn.remove()
           // alert(coinArray[i])
        }
    }
    return money
}

