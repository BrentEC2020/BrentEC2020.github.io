var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
//this function determines the size of the canvas and ensures that the user will not have to scroll to see the whole canvas
function sizeCanvas(){
  var inHeight = innerHeight; //innerHeight of the window
  var inWidth = innerWidth; //innerWidth of the window
  var headerHeight = document.querySelector('#header').offsetHeight; //height of our header
  if((inHeight-headerHeight)<=inWidth){ //if the height is less than the width
    canvas.width = inHeight-headerHeight-40;
    canvas.height = canvas.width;
  } else {
    canvas.height = inWidth-20;
    canvas.width = canvas.height;
  }
};
sizeCanvas();
window.addEventListener('resize', sizeCanvas);//resize the canvas when the window is resized


base_image = new Image();
base_image.src = 'images/LAB.png';
c.drawImage(base_image, 0, 0,canvas.width,canvas.height);

var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballDX = 0;
var ballDY = 0;

function keyReleased() {
  ballDX = 0;
  ballDY = 0;
}

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    c.fillStyle = this.color;
    c.fill();
  }
}

const player = new Player(ballX, ballY, 30, 'blue');
player.draw();

function draw() {
  background(0, 100, 200);

  ballX += ballDX;
  ballY += ballDY;

  if (keyIsPressed) {

    if (key == "w") {
      ballDY = -1;
      ballDX = 0;
    }

    if (key == "s") {
      ballDY = 1;
      ballDX = 0;
    }

    if (key == "a") {
      ballDX = -1;
      ballDY = 0;
    }

    if (key == "d") {
      ballDX = 1;
      ballDY = 0;
    }
  }

  if (ballX > 400) {
    ballX = 0;
  }

  if (ballX < 0) {
    ballX = 400;
  }

  if (ballY > 300) {
    ballY = 0;
  }

  if (ballX > 400) {
    ballX = 300;
  }
  circle(ballX, ballY, 20);


}
// make the draw background function (non interactable objects)


// make the DO EVERYTHING FUNCTION (draw canvas)
// function do_everything(){
//
//   //
//
//
//
//   const player = new Player(canvas.width / 2, canvas.height / 2 + 20, 30, 'black')
//
//   player.draw()
//
//   c.beginPath()
//   c.fillStyle('black')
//   c.fillRect(0,0,canvas.width,canvas.height)
//
//
// }

//

//do_everything();
