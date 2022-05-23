const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1500;
canvas.height = 600;

var ballX = 200;
var ballY = 150;
var ballDX = 0;
var ballDY = 0;

function keyReleased() {
  ballDX = 0;
  ballDY = 0;
}

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
