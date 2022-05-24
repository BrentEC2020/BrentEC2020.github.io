var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var keys = [];

//constants to initialize canvas size
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
window.addEventListener('resize', sizeCanvas);

// Checks if a key is pressed down
window.addEventListener("keydown", function(e) {
	keys[e.keyCode] = true;
})

// Checks if a key is released
window.addEventListener("keyup", function(e) {
	keys[e.keyCode] = false;
})


base_image = new Image();
base_image.src = 'images/LAB.png';
c.drawImage(base_image, 0, 0,canvas.width,canvas.height);

// Initial Player position and size
var playerX = 20;
var playerY = 415;
var playerSize = 25;
var speed = 5;
//var ballDX = 0;
//var ballDY = 0;

/*function keyReleased() {
  ballDX = 0;
  ballDY = 0;
}*/

/*class Player {
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
}*/

// Initializes full program
function init() {
	var playerX = 0;
	var playerY = 0;
}

// Loops every time a key is pressed
function loop() {
	draw();
	controls();
}

// Draws the player and interactive object
function draw() {
	c.clearRect(0, 0, canvas.width, canvas.height);
	c.fillStyle = "red";
	c.fillRect(playerX, playerY, playerSize, playerSize);
  c.fillRect(410, 45, 15, 55);
  c.fillRect(410, 110, 15, 15);
}

// Draws the Interactable Object


function controls() {
	// W key to move player up
	if (keys[87] == true && playerY >= speed) {
		playerY = playerY - speed;
	}

	// S key to move player down
	if (keys[83] == true && playerY <= (canvas.height - speed)) {
		playerY = playerY + speed;
	}

	// A key to move player right
	if (keys[65] == true && playerX >= speed) {
		playerX = playerX - speed;
	}

	// D key to move player left
	if (keys[68] == true && playerX <= (canvas.width - speed)) {
		playerX = playerX + speed;
	}
  // Interact using spacebar within a certain range
  if (keys[32] == true && playerX >= 475 && playerX <= 550 && playerY <= 75) {
    console.log("Interact Key Successful!");
  }

	/*if (ballX > 400) {
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
	}*/
}

// Refreshes State, so site doesn't crash (Calls Loop function every 1000/60 milliseconds)
window.setInterval(loop, 1000/60);
init();
