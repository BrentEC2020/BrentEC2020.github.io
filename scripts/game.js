var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
//variables to initialize canvas size
const inHeight = innerHeight;
const inWidth = innerWidth;
const headerHeight = document.querySelector('#header').offsetHeight;
if((inHeight-headerHeight)<=inWidth){
  console.log(document.querySelector('#header').offsetHeight);
  console.log(inHeight);
  canvas.width = (inHeight-headerHeight-40);
  console.log(inHeight-headerHeight);
  canvas.height = canvas.width;
} else {
  canvas.height = canvas.width;
}

base_image = new Image();
base_image.src = 'images/LAB.png';
c.drawImage(base_image, 0, 0, canvas.width, canvas.height);

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
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
    c.fillStyle = this.color
    c.fill()
  }
}

const player = new Player(ballX, ballY, 30, 'blue')
player.draw()

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
