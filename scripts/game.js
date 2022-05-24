// Define canvas, context, and keys variables
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var keys = [];

//constants to initialize canvas size
function sizeCanvas(){
  var inHeight = innerHeight; //innerHeight of the window
  var inWidth = innerWidth; //innerWidth of the window
  var headerHeight = document.querySelector('#header').offsetHeight; //height of our header
  if((inHeight-headerHeight)<=inWidth){ //if the height is less than the width

    //  NEED TO THINKI MORE ABOUT THIS
    canvas.width = inHeight-headerHeight-40;
    canvas.height = canvas.width;
  } else {
    canvas.height = inWidth-20;
    canvas.width = canvas.height;
  }
  speed=canvas.height/64;
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


current_image = new Image();
//drawing of the image
function drawBackground(src) {
  //check is if the image is loaded
  var isLoaded = current_image.complete && current_image.naturalHeight !== 0;
  current_image.src = src;
  if (isLoaded) {
      //draw background image
      c.drawImage(current_image, 0, 0,canvas.width,canvas.height);
  }

}

// Initial Player position and size
var playerX = 0;
var playerY = 0;
var playerSize = canvas.width/32;
var speed = canvas.width/64;
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
  console.log(playerX);
  console.log(playerY);
}

// Draws the player and interactive object
function draw() {

	c.clearRect(0, 0, canvas.width, canvas.height);//clear canvas
  drawBackground('images/LAB.png'); //draw background with designated path
	c.fillStyle = "red";
	c.fillRect(playerX, playerY, playerSize, playerSize);
  // Draws the Interactable Object
  c.fillRect(410, 45, 15, 55);
  c.fillRect(410, 110, 15, 15);
}




function controls() {
	// W key to move player up
	if (keys[87] == true && playerY > 0) {
		playerY = playerY - speed;
	}

	// S key to move player down
	if (keys[83] == true && playerY < (canvas.height - playerSize)) {
		playerY = playerY + speed;
	}

	// A key to move player right
	if (keys[65] == true && playerX > 0) {
		playerX = playerX - speed;
	}

	// D key to move player left
	if (keys[68] == true && playerX < (canvas.width - playerSize)) {
		playerX = playerX + speed;
	}
  // Interact using spacebar within a certain range
  if (keys[32] == true && playerX >= 265 && playerX <= 450 && playerY >= 125 && playerY <= 200) {
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
