let ball,section;
let points = 0
let sectionsArray = []

function setup() {
	new Canvas(500, 500);
	displayMode('centered');

	ball = new Sprite();
	ball.diameter = 50;

    sections()
}

function draw() {
	background('skyblue');
       

	if (mouse.presses()) {
		ball.speed = 10;
		ball.moveTo(mouse);
	}
    collisions()
    

}


function sections(){
  h = height/10 + 10
  w = width/10
  for(i = 0; i<10; i++){
    for(j = 0; j<10;j++){
        section = new Sprite(w*i - 10,h*j - 10,10,10,'s')
        sectionsArray.push(section)
    }
  }
}

function collisions(){
    for(sects of sectionsArray){
        if(ball.collides(sects)){
            points += 1
            sects.remove()
            //alert(sectionsArray[i])
            
            
        }
    }
    return points
}