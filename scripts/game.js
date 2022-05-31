// Define canvas, context, and keys variables
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var currentRoom; //keeps track of which room we are in


//sizes the canvas based on window size
function sizeCanvas(){
  var header = $("#header");
  var footer = $("#footer");
  var inHeight = innerHeight;//innerHeight of the window
  var inWidth = innerWidth; //innerWidth of the window
  var headerHeight = header.outerHeight(true); //height of our header
  var footerHeight = footer.outerHeight(true); //height of our header
  if((inHeight-headerHeight-footerHeight)<=inWidth){ //if the height is less than the width
    var remainder = (inHeight-headerHeight-footerHeight)%64;
    canvas.width = inHeight-headerHeight-footerHeight-remainder;
    canvas.height = canvas.width;
  }
  else {
    var remainder = (inWidth)%64;
    canvas.height = inWidth-remainder;
    canvas.width = canvas.height;
  }
  playerSize = canvas.width/16;
  tileSize = canvas.width/8;
  moveSpeed = canvas.height/64;
};
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

current_image = new Image();
//drawing of the image
function drawBackground(src) {
  //check is if the image is loaded
  var isLoaded = current_image.complete && current_image.naturalHeight !== 0;
  current_image.src = src;
  if (isLoaded) {
    //draw background image
    ctx.drawImage(current_image, 0, 0,canvas.width,canvas.height);
  }
}

function drawText() {
  ctx.font = "pixelFont";
  ctx.fillText('hello!', canvas.width/2,canvas.width/2);
}

// Initial Player position and size

var playerSize = canvas.width/16;

var levelCols=8;                           // level width, in tiles
var levelRows=8;                            // level height, in tiles
var tileSize= canvas.width/8;                            // tile size, in pixels
var playerCol=1;                                  // player starting column
var playerRow=3;                                  // player starting row
var spacebarPressed=false                         // are we pressing spacebar?
var leftPressed=false;                            // are we pressing LEFT arrow key?
var rightPressed=false;                           // are we pressing RIGHT arrow key?
var upPressed=false;                              // are we pressing UP arrow key?
var downPressed=false;                            // are we pressing DOWN arrow key?
var playerDirection = 'w';                        //what cardinal direction is the player facing
var playerYPos=playerRow*tileSize;   // converting Y player position from tiles to pixels
var playerXPos=playerCol*tileSize;  // converting X player position from tiles to pixels
var moveSpeed = canvas.height/64;
var inDialogue = false; //keeps track of if dialogue is taking place


function Room(src, objects, doors, bounds){
  this.src = src;
  this.objects = objects;
  this.doors = doors;
  this.bounds = bounds;
}

var room1 = new Room ();
room1.src = 'images/LAB.png';
room1.bounds = [
  [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0]
]

currentRoom = room1;

// Initializes full program
function init() {
  var playerCol = 1;
  var playerRow = 3;
}



// Loops every time a key is pressed
function loop() {
  draw();
  update();
}

// Draws the player and interactive object
function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
  drawBackground(currentRoom.src); //draw background with designated path
  ctx.fillStyle = "red";
  //this code shows test bounds
  for(i=0;i<levelRows;i++){
    for(j=0;j<levelCols;j++){
      if(currentRoom.bounds[i][j]==1){

        ctx.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);
      }
    }
  }
  // player = green box
  ctx.fillStyle = "#00ff00";
  ctx.fillRect(playerXPos, playerYPos, tileSize, tileSize);

  if (inDialogue) {
    drawText()
  }
}

// this function will do its best to make stuff work at 60FPS - please notice I said "will do its best"

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000/60);
  };
})();


// simple WASD listeners

document.addEventListener("keydown", function(e){
  switch(e.keyCode){
    case 32:
    spacebarPressed=true;
    break;
    case 65:
    leftPressed=true;
    break;
    case 87:
    upPressed=true;
    break;
    case 68:
    rightPressed=true;
    break;
    case 83:
    downPressed=true;
    break;
  }
}, false);

document.addEventListener("keyup", function(e){
  switch(e.keyCode){
    case 32:
    spacebarPressed=false;
    break;
    case 65:
    leftPressed=false;
    break;
    case 87:
    upPressed=false;
    break;
    case 68:
    rightPressed=false;
    break;
    case 83:
    downPressed=false;
    break;
  }
}, false);



function update() {
  //first checks if the player is done moving before allowing the rows and columns to update
  if (! ( (playerYPos==(playerRow*tileSize))&&(playerXPos==(playerCol*tileSize)) ) ) {
    movePlayer();
  }
//if the player is done moving then do the updating
  else if(rightPressed){
    playerDirection='e';
    if (isPathTile(playerRow,playerCol+1)) {
      playerCol+=1;
    }else {
      //we could add little bump sound effects here if we wanted
    }
  }
  else if(leftPressed){
    playerDirection='w';
    if (isPathTile(playerRow,playerCol-1)) {
      playerCol-=1;
    }else {

    }
  }
  else if(upPressed){
    playerDirection='n';
    if (isPathTile(playerRow-1,playerCol)) {
      playerRow-=1;
    }else {
    }
  }
  else if(downPressed){
    playerDirection='s';
    if (isPathTile(playerRow+1,playerCol)) {
      playerRow+=1;
    }else {
    }
  }
  else if(spacebarPressed){
    interact();
  }

}

//Check if tile is a path
function isPathTile(row, col) {
  if( ( (row>=0)&&(row<levelRows) ) && ( (col>=0)&&(col<levelCols) ) ){
    if(currentRoom.bounds[row][col] !== 1){
      return true;
    }
  }
  else {
    return false;
  }
}

//Handles smooth movement for the player
function movePlayer(){
  if (( playerDirection == 'e' )||(playerDirection== 'w')){
    if (playerXPos>playerCol*tileSize) {
      playerXPos-=moveSpeed;
    } else {
      playerXPos+=moveSpeed;
    }
  } else {
    if (playerYPos>playerRow*tileSize) {
      playerYPos-=moveSpeed;
    } else {
      playerYPos+=moveSpeed;
    }
  }
}

function interact() {
  //check if the player is standing on interactable tile
    //do something
  //check if the player is facing an interactable tile
    //do something
  //if we only want the thing to be interactable once, update the space to 0 or 1
}

// Refreshes State, so site doesn't crash (Calls Loop function every 1000/60 milliseconds)
window.setInterval(loop, 1000/60);
init();
